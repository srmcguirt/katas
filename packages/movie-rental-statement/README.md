# Movie Rental Statement

Generate a plain-text and HTML rental statement with amount owed and frequent renter points

Source: https://codingdojo.org/kata/movie-rental/

## TDD loop

1. **RED** — run the tests. `src/movie-rental-statement.ts` throws `"Not implemented"`, so the test in `src/movie-rental-statement.test.ts` fails.
2. **GREEN** — implement just enough in `src/movie-rental-statement.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run movie-rental-statement:test
```
