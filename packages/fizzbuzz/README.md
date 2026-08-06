# FizzBuzz

Print 1..N, replacing multiples of 3 with Fizz, 5 with Buzz, and both with FizzBuzz

Source: https://codingdojo.org/kata/FizzBuzz/

## TDD loop

1. **RED** — run the tests. `src/fizzbuzz.ts` throws `"Not implemented"`, so the test in `src/fizzbuzz.test.ts` fails.
2. **GREEN** — implement just enough in `src/fizzbuzz.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run fizzbuzz:test
```
