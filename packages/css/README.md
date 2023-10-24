# class-css

一个 css-in-js 库, 可用于样式局域化，以及通过 js 控制样式。

## Quick Start

运行一个简单的示例程序。

```jsx
import { css } from "class-css";
import React, { useState } from "react";

export default () => {
  const [color, setColor] = useState("black");
  return (
    <div>
      <div>
        <button onClick={() => setColor("red")}>红色</button>
        <button onClick={() => setColor("blue")}>蓝色</button>
      </div>
      <div className={css({ color })}>测试文字</div>
    </div>
  );
};
```

## Use In Project

在项目中使用。

### In React.

```jsx
import React from "react";
import { css } from "class-css";

export default () => {
  return <div className={css({ color: "red" })}>一段文字</div>;
};
```

### In Vue.

```jsx
<template>
  <div :class="css({ color: 'red' })">一段文字</div>
</template>

<script setup>
  import { css } from 'class-css';
</script>
```

## Compare with @emotion/css ?

class-css 能比 @emotion/css 创建更少的dom节点。

> @emotion/css 调用 css 方法时，如果不存在于缓存中，则不断创建 style 标签。

> class-css，仅会在全局创建唯一 style 标签，并采用增量添加的形式添加新的样式文本到 style 标签中。

## Why use css-in-js library?

- 实现 style 不支持的功能，例如：伪选择器（:hover）等。
- 方便替换主题色。
- 局域样式，不影响全局样式。
- 可以通过类名进行全局覆盖 css-in-js 样式。
- 无需加载额外的 css 文件
