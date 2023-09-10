# React

Vue 开发者快速学习 React

## 创建项目

基于 Vite 创建一个 React + TypeScript 的项目

```sh
pnpm create vite my-react-app --template react-ts
```

## 声明响应式数据

```tsx
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);

  const onClick = () => {
    setIndex(index + 1);
  };

  return (
    <div>
      <span>{index}</span>
      <button onClick={onClick}>按钮</button>
    </div>
  );
}
```

## 集成路由

安装 react-router-dom

```sh
pnpm add react-router-dom --save
```

配置路由

::: code-group
```tsx [ main.tsx ]
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
```tsx [ router/index.tsx ]
import { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";

import Layouts from "@/layouts/Index";

function lazyLoad(path: string) {
  const Comp = lazy(() => import(`../pages/${path}/${path}`));
  return (
    <Suspense fallback={<div>加载中……</div>}>
      <Comp />
    </Suspense>
  );
}

export const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/home",
        element: lazyLoad("Home"),
      },
      {
        path: "/about",
        element: lazyLoad("About"),
      },
    ],
  },
];
```
```tsx [App.tsx]
import { useRoutes } from "react-router-dom";
import { routes } from "@/router";
import { FC } from "react";

const App: FC = () => {
  const element = useRoutes(routes);

  return <>{element}</>;
};

export default App;
```
```tsx [layouts/Index.tsx]
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layouts: FC = () => {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Layouts;
```
```tsx [pages/Home.tsx]
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);

  const onClick = () => {
    setIndex(index + 1);
  };

  return (
    <div>
      <span>{index}</span>
      <button onClick={onClick}>按钮</button>
    </div>
  );
}
```
```tsx [pages/About.tsx]
export default function About() {
  return <div>about</div>;
}
```
:::

## 集成状态管理

安装 zustand

```sh
pnpm add zustand --save
```

使用

::: code-group
```tsx [stores/config.tsx]
import { create } from "zustand";

type Config = {
  isCollapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

export const useConfigStore = create<Config>((set) => ({
  isCollapsed: false,
  setCollapsed: (val) => set((_) => ({ isCollapsed: val })),
}));
```
```tsx [pages/Home.tsx]
import { useConfigStore } from "@/stores/config";
import { FC } from "react";
import { Button } from "antd";

const Home: FC = () => {
  const { isCollapsed, setCollapsed } = useConfigStore();
  return (
    <div>
      <span>{isCollapsed}</span>
      <Button onClick={() => setCollapsed(!isCollapsed)}>
        按钮
      </Button>
    </div>
  );
};

export default Home;
```
:::