import { calc } from "../src";

test("bracket have higher priority", () => {
  expect(calc("3 * ( 1 + 2 ) ")).toBe(9);
});

test("unit", () => {
  expect(calc("1m + 2mm ")).toBe(1.002);
});

test("Scientific notation", () => {
  expect(calc("1e2m + 1e+1m + 1e-2m")).toBe(110.01);
});

test("Scientific notation error: not exist exponent after exp", () => {
  expect(() => {
    calc("1e2m + 1em");
  }).toThrow(/^lexer/);
});

test("Scientific notation error: not a exponent after exp", () => {
  expect(() => {
    calc("1e2m + 1e++1m");
  }).toThrow(/^lexer/);
});
