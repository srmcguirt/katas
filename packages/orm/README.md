# ORM

Build a minimal ORM reading and writing Person records between a business object and a SQLite database

Source: https://codingdojo.org/kata/orm/

## TDD loop

1. **RED** — run the tests. `src/orm.ts` throws `"Not implemented"`, so the test in `src/orm.test.ts` fails.
2. **GREEN** — implement just enough in `src/orm.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run orm:test
```
