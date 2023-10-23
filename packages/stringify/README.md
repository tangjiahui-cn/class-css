# class-css-stringify

一个对 react-style 类型对象字符串化的库。

## Quick Start
运行一个简单的示例程序。
```jsx
import {getStyleString, getKeyframesString} from 'class-css-stringify'

const styleString = getStyleString('my-ui', {
  color: 'red',
  fontSize: 12,
  flex: 1,
})

const keyframesString = getKeyframesString('my-keyframe', {
  from {
    color: 'red'
  },
  to {
    color: 'blue'
  }
})

console.log(styleString) // .my-ui{color: red;font-size: 12px;flex: 1;}
console.log(keyframesString) // @keyframes my-keyframe{from{color:red;}to{color:blue;}}
```