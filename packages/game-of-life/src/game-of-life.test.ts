import { describe, expect, test } from "bun:test";
import { gameOfLife } from "./game-of-life";

describe("Game of Life", () => {
  test("solves the kata", () => {
    // TODO: replace with the real expected result once the kata is implemented.
    expect(gameOfLife()).toBe(undefined);
  });
});
