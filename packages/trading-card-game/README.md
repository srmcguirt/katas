# Trading Card Game

Implement a rudimentary two-player mana-and-health trading card game loosely based on Hearthstone

Source: https://codingdojo.org/kata/TradingCardGame/

## TDD loop

1. **RED** — run the tests. `src/trading-card-game.ts` throws `"Not implemented"`, so the test in `src/trading-card-game.test.ts` fails.
2. **GREEN** — implement just enough in `src/trading-card-game.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run trading-card-game:test
```
