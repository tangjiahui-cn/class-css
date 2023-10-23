# class-css-cache

class-css库的缓存库实现。
## Quick Start

运行一个简单的示例程序。

```jsx
import { createCache } from "class-css-cache";

const cache = createCache('css');
cache.add('aaabbb', '.my-ui{color:red;}')
cache.add('aaabbb', '.my-ui{color:red;}')
cache.genStyleSheetText() // .my-ui{color:red;}

cache.add('cccccc', '.my-ui{color:blue;}')
cache.genStyleSheetText() // .my-ui{color:red;}.my-ui{color:blue;}
```