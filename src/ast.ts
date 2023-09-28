import { Token } from "./token";
import { isNil } from "./utils";

export class ASTNode {
  protected children: ASTNode[] = [];

  toString = (prefix: string = "") => prefix;

  eval = () => 0;
}

// binary operator
export class BiOpNode extends ASTNode {
  constructor(private root: Token, left: ASTNode, right: ASTNode) {
    super();
    this.children.push(left);
    this.children.push(right);
  }

  eval = () => {
    const left = this.children[0];
    const right = this.children[1];
    switch (this.root.value) {
      case "+":
        return left.eval() + right.eval();
      case "-":
        return left.eval() - right.eval();
      case "*":
        return left.eval() * right.eval();
      case "/":
        return left.eval() / right.eval();
      default:
        throw new Error(`runtime error: the binary operation '${this.root.value}' is not supported`);
    }
  };

  toString = (prefix: string = "") => {
    const isLeaf = this.children.length === 0;
    const s = prefix + (isLeaf ? "└─ " : "├─ ") + this.root.value + "\n";
    const newPrefix = prefix + (isLeaf ? "   " : "│  ");
    const childrenInfo = this.children.map(a => a.toString(newPrefix)).join("");
    return s + childrenInfo;
  };
}

// unaruy ooerator
export class UOpNode extends ASTNode {
  constructor(private root: Token, value: ASTNode) {
    super();
    this.children.push(value);
  }

  eval = () => {
    const root = this.children[0];
    switch (this.root.value) {
      case "+":
        return root.eval();
      case "-":
        return -root.eval();
      default:
        throw new Error(`runtime error: the unary operation '${this.root.value}' is not supported`);
    }
  };

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

  eval = () => {
    const r = Number(this.root.value);
    if (isNaN(r)) {
      throw new Error(`runtime error: '${this.root.value}' is not a number`);
    }
    const unit = this.children[0];
    if (isNil(unit)) {
      return r;
    } else if (unit instanceof UnitNode) {
      return r * unit.eval();
    }
    throw new Error(`runtime error: '${unit}' is not a unit`);
  };

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

  eval = () => {
    switch (this.root.value.toLowerCase()) {
      case "mm":
        return 0.001;
      case "cm":
        return 0.01;
      case "dm":
        return 0.1;
      case "m":
        return 1;
      case "r":
        return 360;
      case "inch":
      case "in":
        return 0.3048;
      case "feet":
      case "foot":
      case "ft":
        return 0.0254;
      default:
        throw new Error(`runtime error: the unit '${this.root.value}' is not supported`);
    }
  };

  toString = (prefix: string = "") => {
    const isLeaf = this.children.length === 0;
    const s = prefix + (isLeaf ? "└─ " : "├─ ") + this.root.value + "\n";
    const newPrefix = prefix + (isLeaf ? "   " : "│  ");
    const childrenInfo = this.children.map(a => a.toString(newPrefix)).join("");
    return s + childrenInfo;
  };
}
