import { Lexer } from "./lexer";
import { Token, TokenType } from "./token";
import { ASTNode, NumberNode, OpNode, UnitNode } from "./ast";

export class Parser {
  private curToken: Token;
  constructor(private lexer: Lexer) {
    this.curToken = lexer.getNextToken();
  }

  parse = () => {
    return this.expr();
  };

  match = (type: TokenType) => {
    if (this.curToken.tokenType === type) {
      this.curToken = this.lexer.getNextToken();
    } else {
      throw new Error(`syntax error: expected '${type}' but get '${this.curToken.tokenType}'`);
    }
  };

  expr: () => ASTNode = () => {
    let node = this.term();
    while (this.curToken.tokenType === TokenType.PLUS || this.curToken.tokenType === TokenType.MINUS) {
      const tmpToken = this.curToken;
      this.match(this.curToken.tokenType);
      node = new OpNode(tmpToken, node, this.term());
    }
    return node;
  };

  term: () => ASTNode = () => {
    let node = this.factor();
    while (this.curToken.tokenType === TokenType.MUTIPLICATION || this.curToken.tokenType === TokenType.DIVISION) {
      const tmpToken = this.curToken;
      this.match(this.curToken.tokenType);
      node = new OpNode(tmpToken, node, this.term());
    }
    return node;
  };

  factor: () => ASTNode = () => {
    if (this.curToken.value === "(") {
      this.match(TokenType.LPARENTHESIS);
      const node = this.expr();
      this.match(TokenType.RPARENTHESIS);
      return node;
    } else {
      return this.liternal();
    }
  };

  liternal: () => ASTNode = () => {
    const tmpToken = this.curToken;
    this.match(TokenType.NUMBER);
    if (this.curToken.tokenType === TokenType.UNIT) {
      const unitToken = this.curToken;
      this.match(TokenType.UNIT);
      return new NumberNode(tmpToken, new UnitNode(unitToken));
    } else return new NumberNode(tmpToken, null);
  };
}
