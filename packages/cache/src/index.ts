/**
 * 缓存
 */
import { globalCacheMap, Cache } from "./globalCacheMap";

export default function createCache(key: string) {
  // 获取全局注册过的cache
  const cache: Cache = globalCacheMap.current[key] || (globalCacheMap.current[key] = {
    styleSheetText: '',
    cached: new Set(),
    temp: []
  });

  // 加入一个缓存数据
  function add(hash, styleText) {
    if (cache.cached.has(hash)) return;
    cache.cached.add(hash);
    cache.temp.push({ hash, styleText });
  }

  // 生成样式文本
  function genStyleSheetText() {
    let res = "";
    cache.temp.forEach((node) => {
      res += node.styleText;
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
    getCache: () => cache
  };
}
