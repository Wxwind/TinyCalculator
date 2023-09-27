import { Token, TokenType } from "./token";

export class ASTNode {
  protected children: ASTNode[] = [];

  toString = (prefix: string = "") => {
    return "ASTNode";
  };
}

export class OpNode extends ASTNode {
  constructor(private root: Token, left: ASTNode, right: ASTNode) {
    super();
    this.children.push(left);
    this.children.push(right);
  }

  toString = (prefix: string = "") => {
    const isLeaf = this.children.length === 0;
    const s = prefix + (isLeaf ? "└─ " : "├─ ") + this.root.value + "\n";
    const newPrefix = prefix + (isLeaf ? "   " : "│  ");
    const childrenInfo = this.children.map(a => a.toString(newPrefix)).join("");
    return s + childrenInfo;
  };
}

export class NumberNode extends ASTNode {
  constructor(private root: Token, child: ASTNode | null) {
    super();
    child && this.children.push(child);
  }

  toString = (prefix: string = "") => {
    const isLeaf = this.children.length === 0;
    const s = prefix + (isLeaf ? "└─ " : "├─ ") + this.root.value + "\n";
    const newPrefix = prefix + (isLeaf ? "   " : "│  ");
    const childrenInfo = this.children.map(a => a.toString(newPrefix)).join("");
    return s + childrenInfo;
  };
}

export class UnitNode extends ASTNode {
  constructor(private root: Token) {
    super();
  }

  toString = (prefix: string = "") => {
    const isLeaf = this.children.length === 0;
    const s = prefix + (isLeaf ? "└─ " : "├─ ") + this.root.value + "\n";
    const newPrefix = prefix + (isLeaf ? "   " : "│  ");
    const childrenInfo = this.children.map(a => a.toString(newPrefix)).join("");
    return s + childrenInfo;
  };
}
