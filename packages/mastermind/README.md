# Mastermind

Score a codebreaker's guess against a secret peg combination with well-placed and misplaced counts

Source: https://codingdojo.org/kata/Mastermind/

## TDD loop

1. **RED** — run the tests. `src/mastermind.ts` throws `"Not implemented"`, so the test in `src/mastermind.test.ts` fails.
2. **GREEN** — implement just enough in `src/mastermind.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run mastermind:test
```
