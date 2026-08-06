# Cupcake Builder

Build cupcakes with a name and price composed from a base cake plus an ordered list of toppings

Source: https://codingdojo.org/kata/cupcake/

## TDD loop

1. **RED** — run the tests. `src/cupcake-builder.ts` throws `"Not implemented"`, so the test in `src/cupcake-builder.test.ts` fails.
2. **GREEN** — implement just enough in `src/cupcake-builder.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run cupcake-builder:test
```
