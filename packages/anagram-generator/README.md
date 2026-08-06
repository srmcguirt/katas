# Anagram Generator

Generate all two-word anagrams of the string "documenting" with maximally readable, self-documenting code

Source: https://codingdojo.org/kata/Anagram/

## TDD loop

1. **RED** — run the tests. `src/anagram-generator.ts` throws `"Not implemented"`, so the test in `src/anagram-generator.test.ts` fails.
2. **GREEN** — implement just enough in `src/anagram-generator.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run anagram-generator:test
```
