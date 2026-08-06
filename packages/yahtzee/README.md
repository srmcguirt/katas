# Yahtzee

Score a five-dice roll against Yahtzee scoring categories, including rerolls

Source: https://codingdojo.org/kata/Yahtzee/

## TDD loop

1. **RED** — run the tests. `src/yahtzee.ts` throws `"Not implemented"`, so the test in `src/yahtzee.test.ts` fails.
2. **GREEN** — implement just enough in `src/yahtzee.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run yahtzee:test
```
