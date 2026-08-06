# Game of Life

Compute the next generation of a finite 2D grid under Conway's Game of Life rules

Source: https://codingdojo.org/kata/GameOfLife/

## TDD loop

1. **RED** — run the tests. `src/game-of-life.ts` throws `"Not implemented"`, so the test in `src/game-of-life.test.ts` fails.
2. **GREEN** — implement just enough in `src/game-of-life.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run game-of-life:test
```
