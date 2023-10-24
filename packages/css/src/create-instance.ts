import createExecutor from "./utils/executor";
import hash from "class-css-hash";
import createCache from "class-css-cache";
import { getStyleString, getKeyframesString } from "class-css-stringify";

export interface StyleObject {
  [propKey: string]: string | number | StyleObject;
}

export interface Options {
  key: string; // 唯一key
  hash?: (value: string) => string;  // 计算hash函数
}

export function createClassCss(options: Options) {
  const cache = createCache(options.key);
  const executor = createExecutor(options.key);
  const hashFn = options?.hash || hash;

  function appendCache(hashStr: string, rulesText: string) {
    // 添加样式到缓存中
    cache.add(hashStr, rulesText);

    // 有待更新缓存时，才更新
    if (cache.tempSize()) {
      executor.updateRules(cache.genRulesText());
    }
  }

  /**
   * 生成类名
   * @param styleObject 样式规则对象
   * @returns 
   */
  function css(styleObject: StyleObject) {
    const hashStr: string = hashFn(JSON.stringify(styleObject));
    const className = `${options.key}-${hashStr}`;
    const rulesText: string = getStyleString(className, styleObject);
    appendCache(hashStr, rulesText);
    return className;
  }
  
  /**
   * 生成 keyframes 名称
   * @param styleObject 样式规则对象
   * @returns 
   */
  function keyframes(styleObject: StyleObject) {
    const hashStr: string = hashFn(JSON.stringify(styleObject));
    const keyframesName = `${options.key}-keyframes-${hashStr}`;
    const keyframesRulesText: string = getKeyframesString(keyframesName, styleObject);
    appendCache(hashStr, keyframesRulesText);
    return keyframesName;
  }

  return {
    key: options.key,
    css,
    keyframes,
    getCache: () => cache,
    getExecutor: () => executor,
  };
}
