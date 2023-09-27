import { Lexer } from "./lexer";
import { Token } from "./token";

export class Parser {
  private curToken: Token;
  constructor(private lexer: Lexer) {
    this.curToken = lexer.getNextToken();
  }

  parse = () => {
    return this.expr();
  };

  movenext = () => {};

  expr = () => {};

  term = () => {};

  factor = () => {};

  liternal = () => {};
}
