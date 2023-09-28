import { Lexer } from "./lexer";
import { Parser } from "./parser";

export const calc = (expr: string) => {
  const l = new Lexer(expr);
  const p = new Parser(l);
  const root = p.parse();
  const res = root.eval();
  return res;
};
