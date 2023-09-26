import { Lexer } from "./lexer";
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
  const l = new Lexer("3* (1m + 0.2mm)");
  let token = l.getNextToken();
  if (isNil(token)) {
    return;
  }
  while (token.tokenType !== TokenType.EOF) {
    console.log(token.toString());
    token = l.getNextToken();
    if (isNil(token)) {
      return;
    }
  }
}
main();
