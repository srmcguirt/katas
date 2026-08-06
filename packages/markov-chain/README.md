# Markov Chain

Generate text of a given length from a learned Markov chain of word transition probabilities

Source: https://codingdojo.org/kata/MarkovChain/

## TDD loop

1. **RED** — run the tests. `src/markov-chain.ts` throws `"Not implemented"`, so the test in `src/markov-chain.test.ts` fails.
2. **GREEN** — implement just enough in `src/markov-chain.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run markov-chain:test
```
