import { Token, TokenType } from "./token";
import { isLetterChar, isNil, isNumberChar } from "./utils";

export class Lexer {
  nextIndex = -1;
  nextChar: string | null = "";
  tokenMap: { [key: string]: TokenType } = {};
  constructor(private text: string) {
    Object.values(TokenType).forEach(k => {
      this.tokenMap[k as string] = k;
    });
    this.moveNext();
  }

  skipWhitespace = () => {
    while (this.nextChar === " " || this.nextChar === "\t" || this.nextChar === "\n") {
      this.moveNext();
    }
  };

  getNextToken = () => {
    if (isNil(this.nextChar)) return new Token(TokenType.EOF, TokenType.EOF);
    this.skipWhitespace();
    // char is number
    if (isNumberChar(this.nextChar)) {
      let res = "";
      // get full number
      while (isNumberChar(this.nextChar)) {
        res += this.nextChar;
        this.moveNext();
        if (this.nextChar === ".") {
          res += this.nextChar;
          this.moveNext();
          while (isNumberChar(this.nextChar)) {
            res += this.nextChar;
            this.moveNext();
          }
        }
      }
      return new Token(TokenType.NUMBER, res);
    } else if (isLetterChar(this.nextChar)) {
      let res = "";
      // get unit
      while (isLetterChar(this.nextChar)) {
        res += this.nextChar;
        this.moveNext();
      }
      return new Token(TokenType.UNIT, res);
    } else {
      const t = this.tokenMap[this.nextChar];
      if (!isNil(t)) {
        this.moveNext();
        return new Token(t, t);
      }

      throw new Error(`lexer: unresolved token '${t}'`);
    }
  };

  moveNext() {
    this.nextIndex++;
    if (this.nextIndex >= this.text.length) {
      this.nextChar = null;
      return;
    }
    this.nextChar = this.text[this.nextIndex];
  }
}
