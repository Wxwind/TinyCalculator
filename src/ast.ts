import { Token } from "./token";

export class ASTNode {
  children: ASTNode[] = [];

  toString = (prefix: string = "") => prefix;
}

// binary operator
export class BinOpNode extends ASTNode {
  constructor(public root: Token, left: ASTNode, right: ASTNode) {
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

// unaruy ooerator
export class UnaryOpNode extends ASTNode {
  constructor(public root: Token, value: ASTNode) {
    super();
    this.children.push(value);
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
  constructor(public root: Token, child: ASTNode | null) {
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
  constructor(public root: Token) {
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
