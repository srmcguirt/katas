# POS Ticket Slicing

Build a point-of-sale cash register ticket system by shipping small, independently demoable user stories

Source: https://codingdojo.org/kata/elephant-carpaccio/

> Originally published as "Elephant Carpaccio" on Coding Dojo.

## TDD loop

1. **RED** — run the tests. `src/pos-ticket-slicing.ts` throws `"Not implemented"`, so the test in `src/pos-ticket-slicing.test.ts` fails.
2. **GREEN** — implement just enough in `src/pos-ticket-slicing.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run pos-ticket-slicing:test
```
