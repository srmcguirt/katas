import { describe, expect, test } from "bun:test";
import { {{ name | camel_case }} } from "./{{ name | kebab_case }}";

describe("{{ title }}", () => {
  test("solves the kata", () => {
    // TODO: replace with the real expected result once the kata is implemented.
    expect({{ name | camel_case }}()).toBe(undefined);
  });
});
