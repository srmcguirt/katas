# Bank OCR

Parse OCR-scanned digit strings from bank documents into account numbers, flagging illegible or invalid ones

Source: https://codingdojo.org/kata/BankOCR/

## TDD loop

1. **RED** — run the tests. `src/bank-ocr.ts` throws `"Not implemented"`, so the test in `src/bank-ocr.test.ts` fails.
2. **GREEN** — implement just enough in `src/bank-ocr.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run bank-ocr:test
```
