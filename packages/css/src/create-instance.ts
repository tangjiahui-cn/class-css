import createExecutor from "./utils/executor";
import hash from 'class-css-hash';
import createCache from "class-css-cache";
import getStyleString from "class-css-stringify";

export interface StyleObject {
  [propKey: string]: string | number;
}

export interface Options {
  key: string;
}

export function createClassCss(options: Options) {
  const cache = createCache(options.key);
  const executor = createExecutor(options.key);

  function css (style: StyleObject) {
    const hashStr: string = hash(JSON.stringify(style));
    const className = `${options.key}-${hashStr}`;
    const styleStr: string = getStyleString(className, style);    

    // 添加样式到缓存中
    cache.add(hashStr, styleStr);

    // 有待更新缓存时，才更新
    if (cache.tempSize()) {
      executor.update(cache.genStyleSheetText());
    }
    return className;
  }

  return {
    css
  }
}
