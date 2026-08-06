# PacMan

Build a Pac-Man game loop with continuous turns, taking ghost behavior into account from the start

Source: https://codingdojo.org/kata/PacMan/

## TDD loop

1. **RED** — run the tests. `src/pac-man.ts` throws `"Not implemented"`, so the test in `src/pac-man.test.ts` fails.
2. **GREEN** — implement just enough in `src/pac-man.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run pac-man:test
```
