# LHS & RHS

LHS = left hand side
RHS = right hand side

例如代码：var a = 1;，LHS 是赋值操作的左手边，RHS 是赋值操作的右手边。

LHS 往内存中存储值的一个操作 赋值的目标 声明
RHS 从内存中取值的一个操作 取值的来源 溯源

## 示例与面试题

LHS 和 RHS 不是一回事。它们指的是不同的东西。LHS 是分配操作的目标。RHS 是赋值操作的来源。

以下代码进行了几次 LHS 和 RHS 引用：

```js
function foo(a) {
  // 形参a有一次隐式的LHS操作 a=2 LHS: 2
  let b = a; // LHS: 3, RHS: 2
  return a + b; // RHS: 3、4
}

let c = foo(2); // LHS: 1, RHS:1
```

一共有 3 个 LHS 引用和 4 个 RHS 引用。

## 用处

LHS 和 RHS 的用处在于帮助我们理解 JavaScript 中的赋值操作是如何进行的，以及为什么会抛出 SyntaxError、ReferenceError 和 TypeError 异常。

### SyntaxError

LHS 查询失败

```js
let a b = 123123; // SyntaxError: Unexpected identifier 'b'
```

### ReferenceError

RHS 查不到

当引擎执行代码时，对变量进行 LHS 查询，如果无法找到变量，引擎会抛出 ReferenceError 异常：

```js
function foo(a) {
  console.log(a + b); // ReferenceError: b is not defined
  b = a;
}
foo(2);
```

### TypeError

RHS 类型查询错误

当引擎执行代码时，对变量进行 RHS 查询，如果 RHS 查询找到了一个变量，但是尝试对这个变量的值进行不合理的操作，引擎会抛出 TypeError 异常：

```js
function foo(a) {
  console.log(a + b); // TypeError: b is undefined
  b();
}
foo(2);
```

## 总结

LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要（也就是说它们没有找到所需的标识符），就会向上级作用域继续查找目标标识符，这样每次上升一级作用域（一层楼），最后抵达全局作用域（顶层），无论找到或没找到都将停止。

不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS 引用会导致自动隐式地创建一个全局变量（非严格模式下），该变量使用 LHS 引用的目标作为标识符，或者抛出 ReferenceError 异常（严格模式下）。

