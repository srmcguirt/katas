import { describe, expect, test } from "bun:test";
import { fizzbuzz } from "./fizzbuzz";

describe("FizzBuzz", () => {
  test("returns the number as a string when not divisible by 3 or 5", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(2)).toBe("2");
  });

  test("returns Fizz for multiples of 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });

  test("returns Buzz for multiples of 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
  });

  test("returns FizzBuzz for multiples of both 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });

  test("produces the correct sequence for 1..15", () => {
    const sequence = Array.from({ length: 15 }, (_, i) => fizzbuzz(i + 1));
    expect(sequence).toEqual([
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
    ]);
  });
});
