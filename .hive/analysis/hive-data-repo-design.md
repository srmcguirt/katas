# Design: Externalize hive state and agent config to a private `hive-data` repo

Cell: `katas--w5hg2-msj82h4249g` (epic `katas--w5hg2-msj82h3x23j`)
Author: RedRiver (design/investigation session), 2026-08-07
Status: design only — nothing built, nothing changed

## TL;DR

- **opencode** can be redirected cleanly via `opencode.json`'s `instructions` field (confirmed, files/globs/URLs). No AGENTS.md needed in the working repo at all.
- **Claude Code** cannot be redirected via config. It hard-requires a real `CLAUDE.md` (or `.claude/CLAUDE.md`) at the project root. The honest floor is a 1-line stub (`@import` or symlink) — not zero files.
- **The swarm-tools hive DB is already global** (`~/.config/swarm-tools/swarm.db`, one file, partitioned by an internal `project_key` string). `.hive/issues.jsonl` / `.hive/memories.jsonl` in each repo are git-committed *exports* of that DB, used for durability and recovery. This changes the whole shape of the problem: we are not moving a database, we are moving where the JSONL mirror gets written and committed.
- `hive_sync`'s git operations are hardcoded to run in `getHiveWorkingDirectory()` (== `process.cwd()` by default). Redirecting sync target to a different repo **requires a code change in the swarm-tools fork** — it is not achievable by configuration alone.
- Recommend **not** touching the DB's `project_key` (absolute path) at all — it's a separate axis from "where does the hive-data folder for this repo live." Introduce a new, independent slug (git-remote-based, with a fallback) purely for hive-data folder naming.

---

## Investigation method — what I actually did

- Read the installed `opencode` v1.18.14 config JSON-schema live from `https://opencode.ai/config.json` and confirmed the `instructions` field exists.
- Fetched the live official docs page `https://opencode.ai/docs/rules/` (not from training data — this is dated `Last updated: Aug 7, 2026` in the fetch) and read the full precedence/instructions/URL behavior.
- Fetched the live official Claude Code docs page `https://docs.claude.com/en/docs/claude-code/memory` and read the full CLAUDE.md/auto-memory loading and configuration model.
- Read the **installed** compiled `opencode-swarm-plugin` (`~/.bun/install/global/node_modules/opencode-swarm-plugin/dist/hive.js`) — the actual code that runs when this session's `hive_*` tools are invoked.
- Read the **source** of the swarm-tools fork at `~/Development/swarm-tools/packages/opencode-swarm-plugin/src/hive.ts` and `~/Development/swarm-tools/packages/swarm-mail/src/libsql.convenience.ts` and confirmed the compiled dist matches the source line-for-line on the relevant functions.
- Inspected `~/.config/swarm-tools/` on disk directly and found the global DB, its WAL files, and multiple `.bak_wiped_*` / `.bak_pre_*` snapshots — physical evidence of the wipe history referenced in the task.
- Inspected `~/.config/opencode/` and `~/.claude/` on disk to see the actual global config files currently in play, and diffed that against what the docs claim.
- Checked git remotes on two real repos (`katas`: single `origin`; `swarm-tools`: `origin` fork + `upstream`) to validate the identity scheme against a real fork scenario already sitting on this machine.

Everything under "VERIFIED" below was established this way. Everything under "INFERRED" is a reasoned judgment call I did not empirically test, and I flag it as such per the task's instructions — I did not create scratch files to test it because the task explicitly said "create nothing... no files outside your design document."

---

## Question 1 — Config resolution

### Who actually reads AGENTS.md / CLAUDE.md on this machine

| Consumer | Reads | Verified how |
|---|---|---|
| **opencode** (v1.18.14) | `AGENTS.md` first, `CLAUDE.md` as fallback if no AGENTS.md, walking up from cwd; then `~/.config/opencode/AGENTS.md`; then `~/.claude/CLAUDE.md` as a final Claude-Code-compat fallback | Live docs fetch, `opencode.ai/docs/rules/` |
| **Claude Code CLI** (v2.1.220, `claude`) | `CLAUDE.md` (not AGENTS.md) walking up from cwd, plus `~/.claude/CLAUDE.md` (user), plus managed-policy locations | Live docs fetch, `docs.claude.com/.../memory` |
| **opencode-swarm-plugin** (the `hive_*`/`swarm_*` tools) | Neither. Grepped the entire compiled bundle for `AGENTS.md`, `CLAUDE.md`, `MEMORY.md` — zero matches. The plugin only touches `.hive/issues.jsonl` and `.hive/memories.jsonl`. | `grep` on installed dist, confirmed against source |
| **Claude Code auto-memory** (`MEMORY.md`) | Its own thing, unrelated to CLAUDE.md. Default location is **already outside the working repo**: `~/.claude/projects/<project>/memory/MEMORY.md`, keyed by git repo, machine-local. Redirectable via `autoMemoryDirectory` in settings (user/project/local/policy scope). | Live docs fetch |

One correction to the task's framing: **`MEMORY.md` is not currently polluting working repos.** I found zero `MEMORY.md` files anywhere under `~/Development` (searched depth 3). Claude Code's auto-memory already lives in `~/.claude/projects/<project>/memory/` by default. The only in-repo agentic files actually present are `.hive/`, `AGENTS.md`, and `CLAUDE.md` (verified on the katas root and several sibling repos). Treat "no MEMORY.md in working repos" as already true, not a migration target — see the non-goal note below.

### The `opencode.json` `instructions` lead — VERIFIED

Confirmed against the live schema and live docs, not training data:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["docs/guidelines.md", "https://raw.githubusercontent.com/.../style.md"]
}
```

- `instructions` is `string[]`. Docs explicitly show file paths, glob patterns (`packages/*/AGENTS.md`), and **remote URLs**, fetched with a 5-second timeout.
- Instructions are **combined with**, not a replacement for, `AGENTS.md`/`CLAUDE.md`. That's fine for us: if the working repo has *no* `AGENTS.md`/`CLAUDE.md` at all, opencode falls through past the local walk-up, picks up the global `~/.config/opencode/AGENTS.md` (personal rules, out of scope — lives in home dir already), and additionally loads whatever `instructions` points at. Net effect: project-specific rules are present in context, sourced entirely from the hive-data repo, with zero rule-content files in the working repo.
- **NOT verified, inferred:** whether `instructions` entries support absolute local filesystem paths (e.g. `/Users/x/hive-data/repos/katas/AGENTS.md`). The docs only show relative-to-project paths and remote URLs in examples; the schema type is an unconstrained `string` with no documented restriction against absolute paths. I did not test this because the task explicitly forbade creating files to test with. **This is the single most important thing to verify empirically before committing to this design** — it's a five-minute check (create one project's `opencode.json` with an absolute-path `instructions` entry, run `opencode debug` or start a session, check if the file loads) but it needs a real opencode session and a scratch file, which is out of scope for a design-only pass.
  - If absolute paths don't work: fall back to a relative path via a **symlink** at a fixed relative location (e.g. `.agents/AGENTS.md -> ~/hive-data/repos/<key>/AGENTS.md`, gitignored, referenced by `instructions: [".agents/AGENTS.md"]`). This still avoids `AGENTS.md`/`CLAUDE.md` at the root, at the cost of one symlink + one gitignore line + one `opencode.json` entry. Not a design blocker either way.

### Claude Code — VERIFIED, and this is the hard constraint

Read the live docs closely. Key facts:

- Claude Code has **no `instructions`-equivalent config field**. `CLAUDE.md` is discovered purely by walking the directory tree from cwd up to root, plus fixed global/managed locations. There is nothing in `settings.json` that lets you point "the project's CLAUDE.md" at an arbitrary external path.
- The only documented redirection mechanisms are:
  1. **`@path/to/file` import syntax**, explicitly confirmed to support absolute paths (docs show `@~/.claude/my-project-instructions.md` as a real example). A `CLAUDE.md` containing exactly one line — `@/Users/x/hive-data/repos/katas/CLAUDE.md` — would work. This still requires a real, physical `CLAUDE.md` file at the project root (or `.claude/CLAUDE.md`).
  2. **A symlink**: `ln -s /Users/x/hive-data/repos/katas/CLAUDE.md ./CLAUDE.md`. Docs explicitly recommend this exact pattern for AGENTS.md↔CLAUDE.md interop, so it's a supported, sanctioned approach, not a hack.
  3. Org-wide **managed policy** CLAUDE.md (`/Library/Application Support/ClaudeCode/CLAUDE.md` on macOS) — global, not per-project, irrelevant here.
  4. `--append-system-prompt` CLI flag — only works if every invocation is wrapped, not viable for interactive `claude` usage.
- **Finding, stated plainly: Claude Code hard-requires a real file at the project root. There is no path to true zero files for Claude Code.** The honest floor is a 1-line stub file (import or symlink). This is a constraint on the whole design, not a detail — "zero AGENTS.md/CLAUDE.md in working repos" as stated in the goal is not fully achievable for Claude Code users; "one inert 1-line pointer file, content-free, that never needs manual editing" is the real floor.
  - Symlink vs `@import`: I'd lean **`@import` stub** over symlink. A symlink pointing outside the repo breaks on machines where the hive-data repo isn't cloned to the same path, and some tools/CI/zip-based file transfer mishandle symlinks. A plain-text one-liner (`@/Users/x/hive-data/repos/katas/CLAUDE.md`) degrades more gracefully (Claude just won't find the import and says nothing, rather than a broken symlink erroring in `ls`, git status noise, etc.) and is easier to templatize per-machine if the hive-data repo path ever differs. Either works; pick one and be consistent — don't mix.

### Answering (a)/(b)/(c)/(d) from the prompt directly

- **(a) `opencode.json` `instructions`** — yes, use this for opencode. Confirmed mechanism, likely-but-unverified for absolute paths, trivial fallback if not.
- **(b) Symlinks** — necessary (not just "promising") for Claude Code specifically, since (a) doesn't exist for it. Optional fallback for opencode if absolute paths in `instructions` don't pan out.
- **(c) Teach swarm tooling a mapping** — irrelevant to config resolution; the swarm plugin doesn't read these files at all (verified above). This only matters for Q3 (sync target), not Q1.
- **(d) Hybrid — this is the answer.** opencode via `opencode.json` `instructions` (content-free), Claude Code via a 1-line stub `CLAUDE.md` (near content-free, but a real file). Both point at the same `hive-data/repos/<key>/{AGENTS.md,CLAUDE.md}` source files, so there's exactly one place a human ever edits project rules.

### What this means for the target repo layout

Given opencode reads `AGENTS.md` preferentially and Claude Code reads `CLAUDE.md`, keep both files in `hive-data/repos/<key>/` as the proposed layout already suggests, but note they can be two different files with genuinely different content (opencode-specific vs Claude-Code-specific tool references), or one could `@import` the other the same way the docs show for AGENTS.md↔CLAUDE.md interop today. That's a content decision, not an architecture one — doesn't change the design.

---

## Question 2 — Repo identity

### Verified: the DB's `project_key` is already just an absolute path string, and the DB is already global

This is the load-bearing discovery of this investigation. Read directly from source (`~/Development/swarm-tools/packages/opencode-swarm-plugin/src/hive.ts` and `packages/swarm-mail/src/libsql.convenience.ts`), matching the compiled dist exactly:

```ts
// hive.ts
export function getHiveWorkingDirectory(): string {
  return hiveWorkingDirectory || process.cwd();
}
```

```ts
// libsql.convenience.ts
/**
 * All databases should use the global path: ~/.config/swarm-tools/swarm.db
 * This function previously created temp databases which caused stray DB
 * proliferation. It now delegates to the canonical global path function.
 */
export function getDatabasePath(projectPath?: string): string {
  const { getDatabasePath: getGlobalPath } = require("./streams/index.js");
  return getGlobalPath(projectPath);  // always ~/.config/swarm-tools/swarm.db
}
```

Confirmed on disk: `~/.config/swarm-tools/swarm.db` is a single 42MB libSQL file, with sibling files `swarm.db.bak_wiped_20260806_155458*` and three more `.bak_pre_*` snapshots — physical evidence of the wipe history the task references. There is **one database on this machine**, not one per project. `project_key` (the absolute cwd path, e.g. `/Users/smcguirt/Development/personal/katas`) is a partition key inside that one database, and it is *also* reused, unmodified, as the literal filesystem path where `.hive/issues.jsonl` gets written and where `hive_sync`'s git commands run (`cwd: getHiveWorkingDirectory()`).

**This means "repo identity" is actually two separate, currently-conflated concerns:**

1. **DB partition key** (`project_key`) — internal to swarm-mail, used to scope cells/memories inside the one global DB. Currently the absolute path.
2. **Sync/output location** — where `.hive/*.jsonl` gets written and which git repo receives the commit. Currently forced to equal (1).

### Recommendation: do not touch (1). Add a new, independent slug for (2) only.

Rekeying `project_key` in the DB (e.g. from absolute path to a git-remote-derived string) means migrating every existing row across every project in a 42MB DB that has already been wiped four times this week. That's exactly the kind of operation the task is warning against, and it buys nothing — the DB is already outside every working repo, already global, already not something this epic needs to move. **Leave `project_key` exactly as it is.**

Introduce a **new, separate function** — call it `resolveHiveDataSlug(projectPath)` — used *only* to name the folder under `hive-data/repos/`. It has no relationship to the DB and requires no DB migration:

```
resolveHiveDataSlug(projectPath):
  1. If projectPath is inside a git repo:
     a. List remotes. Prefer "origin". If no "origin", use the first remote
        alphabetically by name (document this; it's a simplification, not
        a general solution — user can always override by renaming the
        folder in hive-data, since the mapping is just a directory name).
     b. If a remote exists: normalize its URL — strip credentials/protocol,
        strip trailing ".git", lowercase host — e.g.
        "git@github.com:srmcguirt/katas.git" -> "github.com/srmcguirt/katas"
        Use this normalized string (slashes replaced with "-" or nested
        dirs, either is fine) as the slug.
     c. If no remote exists: fall back to (2).
  2. No-remote / non-git fallback: `basename(gitRootOrPath) + "-" + hashProjectPath(absolutePath)`,
     reusing the existing `hashProjectPath()` helper already in swarm-mail
     (SHA-256 truncated to 8 hex chars). Same collision resistance as the
     existing temp-dir naming scheme the codebase already trusts.
```

Verified this handles the fork case correctly using a real example already on this machine: `swarm-tools` has `origin -> git@github.com:srmcguirt/swarm-tools.git` and `upstream -> https://github.com/joelhooks/swarm-tools.git`. Preferring `origin` gives the fork its own slug (`github.com/srmcguirt/swarm-tools`), distinct from upstream — which is the correct outcome; your fork's hive data shouldn't be conflated with upstream's.

**Collisions:** remote-URL-based slugs are effectively collision-free (globally unique URLs). Path-hash fallback slugs collide only if two different absolute paths hash to the same 8 hex chars — astronomically unlikely at personal scale (dozens to low hundreds of repos). If it ever happens, it's user-visible immediately (two repos' JSONL mirrors show up in one folder) and trivially fixed by renaming one folder — there's no silent corruption because the DB itself isn't keyed by this slug.

**Multiple clones/worktrees of the same repo:** correctly share one hive-data folder (same remote URL → same slug), which is the desired behavior — "same project" should mean one AGENTS.md, one JSONL mirror, regardless of which of your three worktrees you're standing in. This is strictly better than the current absolute-path keying, which gives every worktree its own DB partition today.

**Repos with no remote at all:** get the hash fallback. If a remote is added later, the slug scheme changes (hash-based → remote-based) — that's a one-time folder rename in hive-data with zero DB impact, worth documenting but not worth engineering around further.

**Non-git directories:** same fallback as "no remote."

### Verdict on "keep, map, or migrate the existing DB `project_key`"

**Keep, unmodified.** This whole question turned out to be about a *new* identity concept for hive-data folder naming, entirely decoupled from the DB. No migration needed there at all — which removes an entire category of risk from this project.

---

## Question 3 — Sync target

### Verified: `hive_sync` is hardcoded to sync the current repo, and this cannot be changed by configuration

Traced end-to-end in both compiled dist and source (`hive.ts:1528-1710`, matches `dist/hive.js:14703-14816` exactly):

```ts
export const hive_sync = tool({
  async execute(args, ctx) {
    const projectKey = getHiveWorkingDirectory();          // = process.cwd()
    const flushManager = new FlushManager({
      adapter, projectKey,
      outputPath: `${projectKey}/.hive/issues.jsonl`,       // <-- hardcoded
    });
    await flushManager.flush();
    const hivePath = join(projectKey, ".hive");
    await syncMemories(db, hivePath);                       // <-- hardcoded
    await runGitCommand(["add", ".hive/"]);                 // cwd = projectKey
    await runGitCommand(["commit", "-m", "chore: sync hive"]);
    await runGitCommand(["pull", "--rebase"]);
    await runGitCommand(["push"]);
  }
});
```

`runGitCommand` spawns `git` with `cwd: getHiveWorkingDirectory()` — i.e., every git operation in `hive_sync` runs inside **whatever repo you're currently sitting in**. There is no environment variable, no config file, no CLI flag anywhere in this tool that lets you say "flush the JSONL here, but commit it over there." `getHiveWorkingDirectory()` / `setHiveWorkingDirectory()` exist, but flipping that value repurposes it for *both* the DB partition key (Q2) and the sync target (Q3) simultaneously — you cannot move one without moving the other with the current code.

**Finding: this requires an actual code change in the swarm-tools fork.** It's small and mechanical, but it is not a config toggle:

1. Add `resolveHiveDataSlug()` (from Q2) and a `resolveHiveSyncPath(projectKey)` that returns `<hiveDataRepoRoot>/repos/<slug>/` (reading `hiveDataRepoRoot` from a new config source — see below).
2. In `hive_sync`, change:
   - `outputPath` from `${projectKey}/.hive/issues.jsonl` to `${syncPath}/issues.jsonl` (drop the `.hive/` nesting since the whole folder is already hive-scoped inside hive-data).
   - `hivePath` passed to `syncMemories` similarly.
   - `runGitCommand`'s `cwd` — needs a *second* cwd concept, distinct from `getHiveWorkingDirectory()` (which other tools still need to stay `process.cwd()`-ish for DB lookups). Add `getHiveSyncCwd()` that returns the hive-data repo root, independent of `getHiveWorkingDirectory()`.
3. Where does `hiveDataRepoRoot` come from? Recommend a single environment variable, e.g. `HIVE_DATA_REPO` (or a fixed, documented default like `~/hive-data`), read once at tool-call time. Keep it dead simple — this is a personal-scale tool, not a multi-tenant system. A config file inside `~/.config/swarm-tools/` (sibling to the existing `swarm.db`) is the natural home if an env var feels too invisible; either is fine, pick one and don't build both.
4. **Behavior when the hive-data repo is missing/not cloned:** `hive_sync` should fail loudly and early — check `existsSync(hiveDataRepoRoot)` and `existsSync(join(hiveDataRepoRoot, ".git"))` before doing anything else, and return a clear error ("hive-data repo not found at <path> — clone it or set HIVE_DATA_REPO") rather than silently falling back to writing into the working repo. Silent fallback is exactly the kind of behavior that would quietly reintroduce the pollution this whole epic exists to remove.
5. Global rules (`hive-data/global/AGENTS.md`, cross-project learnings) are a separate, simpler write target — not touched by `hive_sync`'s per-project flush at all; that's presumably a manually-curated file or a separate future tool, out of scope for this cell.

This is real implementation work for one of the follow-on cells, not something achievable from the katas repo side alone — it lives in the swarm-tools fork.

---

## Question 4 — Migration order (safety-critical)

Given Q2/Q3's findings, the actual migration is much smaller than it first appears: the DB itself never moves. Only the git-committed JSONL mirrors and the two markdown files move, and the JSONL mirrors are *already* redundant with the DB (that's their whole purpose — they're the recovery path when the DB gets wiped, per `autoMigrateFromJSONL`). The real risk is a window where `.hive/memories.jsonl` exists in neither place, or the swarm-tools code change goes out before the hive-data repo exists to receive it.

Proposed order, each step independently verifiable and each step leaving data in at least two places until the previous copy is confirmed redundant:

1. **Create the private `hive-data` repo remotely and clone it locally.** (Out of scope for this design cell — flagged as build-order item 1 below.) Verify: `git clone` succeeds, repo is private, `git log` shows a clean init.
2. **Copy — not move — the current `.hive/issues.jsonl` and `.hive/memories.jsonl` from every working repo into `hive-data/repos/<slug>/`.** Plain `cp`, no git operations on the source repos yet. Verify: byte-for-byte diff between source and destination copies; `wc -l` line counts match.
3. **Commit and push the copies into hive-data.** Verify: `git log` in hive-data shows the commit; `git show HEAD --stat` lists the expected files; re-clone hive-data into a scratch directory on the side and diff against the working copy, to prove the push actually landed content and isn't a phantom commit.
4. **At this point, data exists in three places: the working repo's git history (untouched), the working repo's working tree (untouched), and hive-data (new copy).** This is the safest possible state — nothing has been deleted anywhere. This is a natural pause point; it's fine to stop here for a while before proceeding.
5. **Ship the swarm-tools code change (Q3) that redirects `hive_sync`'s write target to hive-data**, but do **not** yet remove `.hive/` from the working repos. Run `hive_sync` once against a *test* project first (not katas), confirm it writes to `hive-data/repos/<test-slug>/` and commits there, confirm katas's own `.hive/` is untouched by this run. Verify: `git status` in katas shows no changes; `git log` in hive-data shows a new "chore: sync hive" commit for the test project only.
6. **Run `hive_sync` for katas specifically and diff the result against the manual copy from step 2/3.** They should now match (plus whatever cells changed in between). Verify: diff is empty or only contains expected deltas (new/updated cells since step 2).
7. **Only now, remove `.hive/`, `AGENTS.md`, `CLAUDE.md` from the working repo's working tree** (`git rm -r .hive AGENTS.md CLAUDE.md`, or leave the stub files per Q1), commit, push. This is the first step that changes the working repo's committed state. Verify: `bd`/`hive_*` tools still function normally against the repo (create a throwaway test cell, close it, confirm it round-trips through the DB and shows up correctly in `hive-data/repos/<slug>/issues.jsonl` on the next sync).
8. **Point of no return:** step 7's commit, once pushed. Before that point, every step is reversible by just not proceeding (nothing destructive has happened; `.hive/` still exists locally and in git history either way — the task explicitly notes git history is not being purged, so even "point of no return" here just means "the working tree no longer has these files," not "the data is gone"). After step 7, treat the working repo as fully migrated for that project. Do NOT repeat this migration across other repos in a single batch — one repo at a time, with step 6's diff-verification gate re-run for each, since each repo is an independent risk of "wrote to the wrong slug" or "hit the no-remote fallback path unexpectedly."

The one thing I'd flag as a real hazard, learned from the `.bak_wiped_*` file sitting in `~/.config/swarm-tools/` right now: **do not run this migration while another agent session might concurrently be calling `hive_sync` or `hive_create` against the same project.** The exit-hook flush behavior (`adapterCache` flushed on process exit, writing `${projectKey}/.hive/issues.jsonl`) means a second stale session could resurrect the old output path after you've redirected it, or race the git operations. Coordinate via swarmmail / a single active session per repo during migration, not enforced by the tooling itself.

---

## Question 5 — Multi-machine

**Deferrable, and should be deferred.** Reasoning:

- The task confirms this is currently single-machine, single-DB (`~/.config/swarm-tools/swarm.db` is local, not synced). Nothing today makes concurrent-machine edits a live problem — there's exactly one DB, one machine, one set of working repos.
- If hive-data is cloned on a second machine later, the failure mode is standard git-conflict-on-jsonl-append, no worse than any other team-shared jsonl/lockfile-style file, and it's *strictly less risky* than the current situation where the source of truth is a local SQLite file with no sync story at all. Git merge conflicts on an appended-only JSONL are annoying but recoverable (worst case: manually interleave lines, or take one side and re-run `hive_sync` to regenerate from the DB — except the DB is also local-only, which is the actual second-machine gap, not the JSONL).
- The real second-machine question this design doesn't solve — and shouldn't try to yet — is that `~/.config/swarm-tools/swarm.db` itself has no cross-machine sync mechanism. hive-data being clonable everywhere doesn't fix that; the DB is still the local source of truth on whichever machine you're on, and `.hive/*.jsonl` mirrors are last-write-wins per machine. That's a pre-existing property of the current single-DB architecture, not something this epic introduces or worsens.
- Recommendation: ship the single-machine design now (this doc). If/when a second machine enters the picture, revisit with either (a) a lightweight last-writer-wins convention on `hive_sync` (pull-rebase-push, already what the code does) plus manual conflict resolution on the rare JSONL conflict, or (b) migrating the DB itself to something syncable (libSQL supports remote/Turso backends) — but that's a materially bigger change and out of scope until it's an actual problem.

---

## Non-goals / explicit corrections to the task framing

- **`MEMORY.md` is not currently in any working repo on this machine** (verified: zero matches searching `~/Development` at depth 3). Claude Code's native auto-memory already defaults to `~/.claude/projects/<project>/memory/MEMORY.md`, outside any git repo. No migration action needed for it. It *can* be redirected into hive-data via `autoMemoryDirectory`, but doing so at project scope requires its own tiny `.claude/settings.json` pointer file (same "floor" pattern as Q1), and doing it at user scope would collide all projects into one folder. Recommend treating this as **out of scope / non-goal** for this epic — it's already outside the repo, moving it further doesn't reduce working-repo pollution, and it adds another moving config piece for no measured benefit.
- **The hive DB itself is not moving.** It was already global and already outside every working repo before this epic started. This epic is about the git-committed *mirrors* (`.hive/*.jsonl`) and the two markdown config files, not the database.

---

## Build order for the remaining five cells

1. **Create the private `hive-data` repo** (remote + local clone), with the `global/` and `repos/` skeleton from the task's proposed layout. Pure setup, no code.
2. **Implement `resolveHiveDataSlug()`** in the swarm-tools fork (Q2) — standalone, unit-testable function with no dependency on `hive_sync` yet. Test against the real cases already on this machine (katas: has origin; swarm-tools: has origin+upstream; a scratch non-git dir: hash fallback).
3. **Implement the `hive_sync` redirect** (Q3): `resolveHiveSyncPath()`, `getHiveSyncCwd()`, wire into `FlushManager`/`syncMemories`/`runGitCommand`, add the missing-hive-data-repo guard. Ship as a swarm-tools change, tested against a throwaway scratch project first, never against katas directly.
4. **Migrate one pilot repo end-to-end** using the Question 4 order, verifying every gate. Pick a low-stakes repo, not katas, as the pilot.
5. **Migrate katas (and any other real repos) one at a time**, each with its own full verification pass, plus add the Q1 stub files (`opencode.json` `instructions`, and the 1-line `CLAUDE.md` import/symlink) once the absolute-path-in-`instructions` question is empirically confirmed.

Each of these is independently completable and independently revertable, which matches the "never solely in one place" principle from Q4 at the project-plan level too.
