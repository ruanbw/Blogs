# Pinia

## 安装

```sh
pnpm install pinia --save
```

## 配置

::: code-group

```ts [main.ts]
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";

app.use(store);
app.mount("#app");
```

```ts [stores/index.ts]
import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;
```

:::

### 创建仓库

```ts
// stores/counter.ts
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### 使用状态

```vue
<template>
  <div>
    <span>{{ counter.state.count }}</span>
    <button @click="counter.increment()">increment</button>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
</script>
```

