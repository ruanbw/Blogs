# 冒泡排序

冒泡排序是一种基础的排序算法。其基本思想是通过不断地比较相邻元素并在必要时进行交换，将最大（或最小）的元素"冒"到序列的一端。

## 普通版本

```js
let array = [5, 3, 8, 4, 6];

// 冒泡排序的实现
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length - i - 1; j++) {
    if (array[j] > array[j + 1]) {
      // 交换元素
      let temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;
    }
  }
}

console.log(array); // 输出: [3, 4, 5, 6, 8]
```

## 优化策略

### 交互标记

如果在一次遍历过程中没有发生过交换，那么意味着序列已经是有序的，不需要继续排序。我们可以通过设置一个标记来优化算法。如果在某次遍历中没有发生交换，则直接结束排序。

这个优化对于已经部分有序的序列来说，可以大幅度提高效率。

```js
let array = [5, 3, 8, 4, 6];
let swapped = true;

while (swapped) {
  swapped = false;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
      swapped = true;
    }
  }
}

console.log(array); // 输出: [3, 4, 5, 6, 8]
```

### 双向冒泡排序

一趟遍历只能确保最大（或最小）的数被移到序列一端，在双向冒泡排序中，一趟遍历包括了两个过程，一个从头至尾，一个从尾至头，这样就能确保在一趟遍历后，最大和最小的数都被移到了正确的位置。

```js
let array = [5, 3, 8, 4, 6];
let swapped;
let start = 0;
let end = array.length - 1;

while (start < end) {
  for (let i = start; i < end; i++) {
    if (array[i] > array[i + 1]) {
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
      swapped = i;
    }
  }
  end = swapped;

  for (let i = end; i > start; i--) {
    if (array[i] < array[i - 1]) {
      let temp = array[i];
      array[i] = array[i - 1];
      array[i - 1] = temp;
      swapped = i;
    }
  }
  start = swapped;
}

console.log(array); // 输出: [3, 4, 5, 6, 8]
```

### 双向冒泡排序

一趟遍历只能确保最大（或最小）的数被移到序列一端，在双向冒泡排序中，一趟遍历包括了两个过程，一个从头至尾，一个从尾至头，这样就能确保在一趟遍历后，最大和最小的数都被移到了正确的位置。

```js
let array = [5, 3, 8, 4, 6];
let lastExchangeIndex = 0;
let sortBorder = array.length - 1;

for (let i = 0; i < array.length - 1; i++) {
  let isSorted = true;
  for (let j = 0; j < sortBorder; j++) {
    if (array[j] > array[j + 1]) {
      let temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;

      isSorted = false;
      lastExchangeIndex = j;
    }
  }
  sortBorder = lastExchangeIndex;
  if (isSorted) {
    break;
  }
}

console.log(array); // 输出: [3, 4, 5, 6, 8]
```
