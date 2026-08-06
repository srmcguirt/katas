# Tape Machine Interpreter

Build an interpreter for a minimal, Turing-complete tape-and-pointer esoteric instruction set

Source: https://codingdojo.org/kata/

## TDD loop

1. **RED** — run the tests. `src/tape-machine-interpreter.ts` throws `"Not implemented"`, so the test in `src/tape-machine-interpreter.test.ts` fails.
2. **GREEN** — implement just enough in `src/tape-machine-interpreter.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run tape-machine-interpreter:test
```
