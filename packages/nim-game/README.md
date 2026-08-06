# Nim Game

Build a two-player Nim stick game with configurable starting stick count

Source: https://codingdojo.org/kata/Nim/

## TDD loop

1. **RED** — run the tests. `src/nim-game.ts` throws `"Not implemented"`, so the test in `src/nim-game.test.ts` fails.
2. **GREEN** — implement just enough in `src/nim-game.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run nim-game:test
```
