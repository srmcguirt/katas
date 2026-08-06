# Langton Ant

Simulate Langton's Ant, a cellular automaton that flips cell colors and turns based on simple rules

Source: https://codingdojo.org/kata/LangtonAnt/

## TDD loop

1. **RED** — run the tests. `src/langton-ant.ts` throws `"Not implemented"`, so the test in `src/langton-ant.test.ts` fails.
2. **GREEN** — implement just enough in `src/langton-ant.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run langton-ant:test
```
