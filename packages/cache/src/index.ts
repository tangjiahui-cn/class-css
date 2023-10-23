/**
 * 缓存
 */
import { globalCacheMap } from "./globalCacheMap";

export default function createCache(key) {
  // 获取全局注册过的cache
  console.log('create cache: ', globalCacheMap.current[key]);
  const cache = globalCacheMap.current[key] || (globalCacheMap.current[key] = {
    styleSheetText: '',
    cached: new Set(),
    temp: []
  });

  // 加入一个缓存数据
  function add(hash, styleText) {
    if (cache.cached.has(hash)) return;
    cache.temp.push({ hash, styleText });
  }

  // 生成样式文本
  function genStyleSheetText() {
    let res = "";
    cache.temp.forEach((node) => {
      res += node.styleText;
      cache.cached.add(node.hash);
    });
    cache.temp = [];
    return (cache.styleSheetText += res);
  }

  // 暂未使用的缓存数据大小
  function tempSize() {
    return cache.temp.length;
  }

  return {
    add,
    tempSize,
    genStyleSheetText,
  };
}
