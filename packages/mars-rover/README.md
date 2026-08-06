# Mars Rover

Simulate a rover moving and turning on a bounded map, stopping when it meets an obstacle

Source: https://codingdojo.org/kata/mars-rover/

## TDD loop

1. **RED** — run the tests. `src/mars-rover.ts` throws `"Not implemented"`, so the test in `src/mars-rover.test.ts` fails.
2. **GREEN** — implement just enough in `src/mars-rover.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run mars-rover:test
```
