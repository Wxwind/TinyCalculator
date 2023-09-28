import { calc } from "./calculator";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { TokenType } from "./token";
import { isNil } from "./utils";
import { createInterface } from "readline";

export function express() {}

function main() {
  //   const readline = createInterface({ input: process.stdin, output: process.stdout });
  //   readline.question(`What's your name?`, name => {
  //     console.log(`Hi ${name}!`);
  //     readline.close();
  //   });

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

  // TEST: parser
  // console.time("compiler");
  // const l = new Lexer("3 * (1m + 0.2mm)");
  // const p = new Parser(l);
  // const root = p.parse();
  // console.log(root.toString());
  // console.timeEnd("compiler");

  console.time("compiler");
  const exp = "3 * (0.1ft + 2mm)";
  const res = calc(exp);
  console.log("the result of '%s' is: %s", exp, res);
  console.timeEnd("compiler");
}
main();
