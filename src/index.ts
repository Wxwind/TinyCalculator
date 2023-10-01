import { calc, printAST } from "./calculator";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { TokenType } from "./token";
import { isNil } from "./utils";
import { createInterface } from "readline";

function main() {
  // TEST: lexer
  // const l = new Lexer("3 * (1m + 0.2mm)");
  // let token = l.getNextToken();
  // if (isNil(token)) {
  //   return;
  // }
  // while (token.tokenType !== TokenType.EOF) {
  //   console.log(token.toString());
  //   token = l.getNextToken();
  //   if (isNil(token)) {
  //     return;
  //   }
  // }

  // TEST: parser;
  console.time("compiler");
  const l = new Lexer("2 *-(--3+4ft*(2mm+6))");

  const p = new Parser(l);
  const root = p.parse();
  console.timeEnd("compiler");
  printAST(root);

  // console.time("compiler");
  // const exp = "2 *-(--3)";
  // const res = calc(exp);
  // console.log("the result of '%s' is: %s", exp, res);
  // console.timeEnd("compiler");
}
main();
