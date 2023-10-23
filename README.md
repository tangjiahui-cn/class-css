# class-css

一个 css-in-js 库。
## Quick Start

运行一个简单的示例程序。

```jsx
import { css } from "class-css";
import React, {useState} from "react";

export default () => {
  const [color, setColor] = useState('black');
  return (
    <div>
      <div>
        <button onClick={() => setColor('red')}>红色</button>
        <button onClick={() => setColor('blue')}>蓝色</button>
      </div>
      <div className={css({ color })}>
        测试文字
      </div>
    </div>
  );
};
```
## Why Not @emotion/css ?
 @emotion/css是一款css-in-js实现，class-css是对其的扩充。
 
 @emotion/css虽然有缓存机制的存在，当仍然会创建大量的style标签。

 class-css作为其的一种替代方案，确保每个实例仅对应一个style标签。同时由于自实现缓存机制存在（对每个style文本计算唯一hash并缓存到Set中），不会重复进行大量耗时运算，避免对性能造成影响。


## Run Local Example

运行项目

```shell
pnpm install

pnpm dev
```

打包

```
pnpm build
```

发布

```
pnpm build &&

lerna publish
```