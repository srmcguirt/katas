# RSA

Generate RSA public/private key pairs and use them to encrypt and decrypt a message

Source: https://codingdojo.org/kata/rsa/

## TDD loop

1. **RED** — run the tests. `src/rsa.ts` throws `"Not implemented"`, so the test in `src/rsa.test.ts` fails.
2. **GREEN** — implement just enough in `src/rsa.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run rsa:test
```
