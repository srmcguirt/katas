import { describe, expect, test } from "bun:test";
import { tripService } from "./trip-service";

describe("Trip Service", () => {
  test("solves the kata", () => {
    // TODO: replace with the real expected result once the kata is implemented.
    expect(tripService()).toBe(undefined);
  });
});
