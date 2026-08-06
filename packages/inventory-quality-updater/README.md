# Inventory Quality Updater

Update sell-in days and quality for a shop's inventory items under item-specific degradation rules

Source: https://codingdojo.org/kata/gilded-rose/

## TDD loop

1. **RED** — run the tests. `src/inventory-quality-updater.ts` throws `"Not implemented"`, so the test in `src/inventory-quality-updater.test.ts` fails.
2. **GREEN** — implement just enough in `src/inventory-quality-updater.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run inventory-quality-updater:test
```

> Originally published as "Gilded Rose".
