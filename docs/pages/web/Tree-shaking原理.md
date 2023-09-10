# Tree-shaking 原理

参考链接:

[掘金/han\_/tree-shaking 的原理](https://juejin.cn/post/7265125368553685050)

## 完整代码

```js
// test.js
function add(a, b) {
  return a + b;
}
function multiple(a, b) {
  return a * b;
}
let firstNum = 3,
  secondNum = 4;
add(firstNum, secondNum);
```

在这段代码中，我们定义了两个函数 add 和 multiple，两个变量 firstNum 和 secondNum，然后调用了 add 方法并 firstNum 和 secondNum 作为参数传入。

很明显，multiple 方法是没有被调用到的，打包的时候其实是可以被删除掉的，以减少我们打包后的代码体积。

那么，如何删除 multiple 呢？这时候就该我们的 ast 就登场了！

```js
// tree-shaking.js
const acorn = require("acorn");
const fs = require("fs");
const path = require("path");

const buffer = fs
  .readFileSync(path.resolve(process.cwd(), "./test.js"))
  .toString();
const body = acorn.parse(buffer, {
  ecmaVersion: "latest",
}).body;

// 引用一个 Generator 类，用来生成 ast 对应的代码
const Generator = require("./generator.js");
// 创建 Generator 实例
const gen = new Generator();
// 定义变量decls  存储所有的函数或变量类型节点 Map类型
const decls = new Map();
// 定义变量calledDecls 存储被用到过的函数或变量类型节点 数组类型
const calledDecls = [];
// 保存代码信息
let code = [];

// 开始遍历 ast
body.forEach((node) => {
  if (node.type === "FunctionDeclaration") {
    const code = gen.run([node]);
    decls.set(gen.visitNode(node.id), code);
    return;
  }
  if (node.type === "VariableDeclaration") {
    for (const decl of node.declarations) {
      decls.set(
        gen.visitNode(decl.id),
        gen.visitVariableDeclarator(decl, node.kind)
      );
    }
    return;
  }
  if (node.type === "ExpressionStatement") {
    if (node.expression.type === "CallExpression") {
      const callNode = node.expression;
      calledDecls.push(gen.visitIdentifier(callNode.callee));
      for (const arg of callNode.arguments) {
        if (arg.type === "Identifier") {
          calledDecls.push(arg.name);
        }
      }
    }
  }
  if (node.type === "Identifier") {
    calledDecls.push(node.name);
  }
  // 存储代码信息
  code.push(gen.run([node]));
});

console.log("decls", decls);
// decls Map(4) {
//   'add' => 'function add(a,b){\n  return a+b\n\n}\n',
//   'multiple' => 'function multiple(a,b){\n  return a*b\n\n}\n',
//   'firstNum' => 'let firstNum=3;\n',
//   'secondNum' => 'let secondNum=4;\n'
// }
console.log("calledDecls", decls);
// calledDecls Map(4) {
//   'add' => 'function add(a,b){\n  return a+b\n\n}\n',
//   'multiple' => 'function multiple(a,b){\n  return a*b\n\n}\n',
//   'firstNum' => 'let firstNum=3;\n',
//   'secondNum' => 'let secondNum=4;\n'
// }
code = calledDecls
  .map((c) => decls.get(c))
  .concat(code)
  .join("");
console.log(code);
// function add(a,b){
//   return a+b
// }
// let firstNum=3;
// let secondNum=4;
// add(firstNum,secondNum);
```

::: details 点击查看 generator.js

```js
// generator.js
class Generator {
  run(body) {
    let str = "";
    str += this.visitNodes(body);
    return str;
  }
  visitNodes(nodes) {
    let str = "";
    for (const node of nodes) {
      str += this.visitNode(node);
    }
    return str;
  }
  visitNode(node) {
    let str = "";
    switch (node.type) {
      case "VariableDeclaration":
        str += this.visitVariableDeclaration(node);
        break;
      case "VariableDeclarator":
        str += this.visitVariableDeclarator(node);
        break;
      case "Literal":
        str += this.visitLiteral(node);
        break;
      case "Identifier":
        str += this.visitIdentifier(node);
        break;
      case "BinaryExpression":
        str += this.visitBinaryExpression(node);
        break;
      case "FunctionDeclaration":
        str += this.visitFunctionDeclaration(node);
        break;
      case "BlockStatement":
        str += this.visitBlockStatement(node);
        break;
      case "CallExpression":
        str += this.visitCallExpression(node);
        break;
      case "ReturnStatement":
        str += this.visitReturnStatement(node);
        break;
      case "ExpressionStatement":
        str += this.visitExpressionStatement(node);
        break;
    }
    return str;
  }
  visitVariableDeclaration(node) {
    let str = "";
    str += node.kind + " ";
    str += this.visitNodes(node.declarations);
    return str + "\n";
  }
  visitVariableDeclarator(node, kind) {
    let str = kind ? kind + " " : "";
    str += this.visitNode(node.id);
    str += "=";
    str += this.visitNode(node.init);
    return str + ";" + "\n";
  }
  visitLiteral(node) {
    return node.raw;
  }
  visitIdentifier(node) {
    return node.name;
  }
  visitBinaryExpression(node) {
    let str = "";
    str += this.visitNode(node.left);
    str += node.operator;
    str += this.visitNode(node.right);
    return str + "\n";
  }
  visitFunctionDeclaration(node) {
    let str = "function ";
    str += this.visitNode(node.id);
    str += "(";
    for (let paramIndex = 0; paramIndex < node.params.length; paramIndex++) {
      str += this.visitNode(node.params[paramIndex]);
      str += node.params[paramIndex] === undefined ? "" : ",";
    }
    str = str.slice(0, str.length - 1);
    str += "){\n";
    str += this.visitNode(node.body);
    str += "}";
    return str + "\n";
  }
  visitBlockStatement(node) {
    let str = "";
    str += this.visitNodes(node.body);
    return str;
  }
  visitCallExpression(node) {
    let str = "";
    str += this.visitIdentifier(node.callee);
    str += "(";
    for (const arg of node.arguments) {
      str += this.visitNode(arg) + ",";
    }
    str = str.slice(0, -1);
    str += ");";
    return str + "\n";
  }
  visitReturnStatement(node) {
    let str = "";
    str = str + "  return " + this.visitNode(node.argument);
    return str + "\n";
  }
  visitExpressionStatement(node) {
    return this.visitNode(node.expression);
  }
}

module.exports = Generator;
```

:::

## 总结

Tree-shaking 其实是通过 AST (抽象语法树)来实现的,通过把代码片段转为 AST 语法树，它记录了引入、变量、方法的节点，之后对 AST 语法树进行分析,删除没有使用的节点从而实现 Tree-shaking

<!-- | 节点名称 | 描述 |
| ------ | ----------- |
|元素节点| 　　 Node.ELEMENT_NODE(1)|
|属性节点| 　　 Node.ATTRIBUTE_NODE(2)|
|文本节点| 　　 Node.TEXT_NODE(3)|
|CDATA 节点| Node.CDATA_SECTION_NODE(4)|
|实体引用名称节点| 　　 Node.ENTRY_REFERENCE_NODE(5)|
|实体名称节点| 　　 Node.ENTITY_NODE(6)|
|处理指令节点| 　　 Node.PROCESSING_INSTRUCTION_NODE(7)|
|注释节点| 　 Node.COMMENT_NODE(8)|
|文档节点| 　 Node.DOCUMENT_NODE(9)|
|文档类型节点| 　　 Node.DOCUMENT_TYPE_NODE(10)|
|文档片段节点| 　　 Node.DOCUMENT_FRAGMENT_NODE(11)|
|DTD 声明节点| Node.NOTATION_NODE(12)| -->
