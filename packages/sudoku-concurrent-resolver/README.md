# Sudoku the Concurrent Resolver

Solve Sudoku puzzles using concurrent, collaborating cells that narrow their own possible values

Source: https://codingdojo.org/kata/sudoku/

## TDD loop

1. **RED** — run the tests. `src/sudoku-concurrent-resolver.ts` throws `"Not implemented"`, so the test in `src/sudoku-concurrent-resolver.test.ts` fails.
2. **GREEN** — implement just enough in `src/sudoku-concurrent-resolver.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run sudoku-concurrent-resolver:test
```
