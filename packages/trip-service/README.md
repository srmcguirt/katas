# Trip Service

Test and refactor a legacy TripService class with hard-coded dependencies into well-crafted, testable code

Source: https://codingdojo.org/kata/TripService/

## TDD loop

1. **RED** — run the tests. `src/trip-service.ts` throws `"Not implemented"`, so the test in `src/trip-service.test.ts` fails.
2. **GREEN** — implement just enough in `src/trip-service.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run trip-service:test
```
