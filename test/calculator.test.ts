import { calc } from "../src";

test("bracket have higher priority", () => {
  expect(calc("3 * ( 1 + 2 ) ")).toBe(9);
});

test("unit", () => {
  expect(calc("1m + 2mm ")).toBe(1.002);
});
