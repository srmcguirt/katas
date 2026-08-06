# Quote of the Day

Build a web app that serves a quote of the day, iterating via page reloads instead of tests

Source: https://codingdojo.org/kata/QotdCgi/

## TDD loop

1. **RED** — run the tests. `src/quote-of-the-day.ts` throws `"Not implemented"`, so the test in `src/quote-of-the-day.test.ts` fails.
2. **GREEN** — implement just enough in `src/quote-of-the-day.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run quote-of-the-day:test
```
