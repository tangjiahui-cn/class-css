# class-css

一个 css-in-js 库, 可用于样式局域化，以及通过js控制样式。

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
import css from "class-css";

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

## Why Not @emotion/css ?

@emotion/css 是一款 css-in-js 实现，class-css 是对其的扩充。

@emotion/css 虽然有缓存机制的存在，当仍然会创建大量的 style 标签。

class-css 作为其的一种替代方案，确保每个实例仅对应一个 style 标签。同时由于自实现缓存机制存在（对每个 style 文本计算唯一 hash 并缓存到 Set 中），不会重复进行大量耗时运算，避免对性能造成影响。

## Why use css-in-js library?
- 实现style不支持的功能，例如：伪选择器（:hover）等。
- 方便替换主题色。
- 局域样式，不影响全局样式。
- 可以通过类名进行全局覆盖css-in-js样式。
- 无需加载额外的css文件