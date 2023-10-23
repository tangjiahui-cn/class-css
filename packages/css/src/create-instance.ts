import createExecutor from "./utils/executor";
import hash from "class-css-hash";
import createCache from "class-css-cache";
import { getStyleString, getKeyframesString } from "class-css-stringify";

export interface StyleObject {
  [propKey: string]: string | number | StyleObject;
}

export interface Options {
  key: string;
}

export function createClassCss(options: Options) {
  const cache = createCache(options.key);
  const executor = createExecutor(options.key);

  function appendCache(hashStr: string, styleStr: string) {
    // 添加样式到缓存中
    cache.add(hashStr, styleStr);

    // 有待更新缓存时，才更新
    if (cache.tempSize()) {
      executor.update(cache.genStyleSheetText());
    }
  }

  function css(style: StyleObject) {
    const hashStr: string = hash(JSON.stringify(style));
    const className = `${options.key}-${hashStr}`;
    const styleStr: string = getStyleString(className, style);
    appendCache(hashStr, styleStr);
    return className;
  }

  function keyframes(style: StyleObject) {
    const hashStr: string = hash(JSON.stringify(style));
    const keyframeName = `${options.key}-keyframes-${hashStr}`;
    const styleStr: string = getKeyframesString(keyframeName, style);
    appendCache(hashStr, styleStr);
    return keyframeName;
  }

  return {
    css,
    keyframes,
  };
}
