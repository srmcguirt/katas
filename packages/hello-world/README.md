# Hello World

Print "Hello, World!" to the screen

Source: https://codingdojo.org/kata/Hello/

## TDD loop

1. **RED** — run the tests. `src/hello-world.ts` throws `"Not implemented"`, so the test in `src/hello-world.test.ts` fails.
2. **GREEN** — implement just enough in `src/hello-world.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run hello-world:test
```
