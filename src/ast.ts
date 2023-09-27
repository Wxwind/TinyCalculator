import { Token, TokenType } from "./token";

export class ASTNode {
  toString = () => {
    console.log("ASTNode");
  };
}

export class OpNode extends ASTNode {
  constructor(private left: ASTNode, private right: ASTNode, private root: Token) {
    super();
  }

  toString = () => {
    console.log(this.root.value);
  };
}
