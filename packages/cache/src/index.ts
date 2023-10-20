"use strict";
/**
 * 缓存
 */
export default function createCache(key) {
	// 样式表字符串
  let styleSheetText = "";
	// 已命中缓存（hash -> 样式表文本）
  const cached = new Set();
	// 缓存
  let temp = [];

  function add(hash, styleText) {
    if (cached.has(hash)) return;
    temp.push({ hash, styleText });
  }

  function genStyleSheetText() {
    let res = "";
    temp.forEach((node) => {
      const className = `${key}-${node.hash}`;
      // const classText = `.${className}{${node.styleText}}`;
      // res += classText;
      res += node.styleText;
      cached.add(node.hash);
    });
    temp = [];
    return (styleSheetText += res);
  }

  function tempSize() {
    return temp.length;
  }

  return {
    add,
    tempSize,
    genStyleSheetText,
  };
}
