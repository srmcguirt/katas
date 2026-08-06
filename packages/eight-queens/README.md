# Eight Queens

Place eight queens on a chessboard so that none can capture another, finding all solutions

Source: https://codingdojo.org/kata/eight-queens/

## TDD loop

1. **RED** — run the tests. `src/eight-queens.ts` throws `"Not implemented"`, so the test in `src/eight-queens.test.ts` fails.
2. **GREEN** — implement just enough in `src/eight-queens.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run eight-queens:test
```
