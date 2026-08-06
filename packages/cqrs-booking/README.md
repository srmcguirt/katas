# CQRS Booking

Implement a single-hotel booking system using the Command Query Responsibility Segregation pattern

Source: https://codingdojo.org/kata/CQRS_Booking/

## TDD loop

1. **RED** — run the tests. `src/cqrs-booking.ts` throws `"Not implemented"`, so the test in `src/cqrs-booking.test.ts` fails.
2. **GREEN** — implement just enough in `src/cqrs-booking.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run cqrs-booking:test
```
