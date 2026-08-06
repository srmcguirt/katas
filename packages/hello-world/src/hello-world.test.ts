import { describe, expect, test } from "bun:test";
import { helloWorld } from "./hello-world";

describe("Hello World", () => {
  test("solves the kata", () => {
    // TODO: replace with the real expected result once the kata is implemented.
    expect(helloWorld()).toBe(undefined);
  });
});
