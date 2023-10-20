/**
 * 缓存
 */

interface Temp {
  hash: string;
  styleText: string;
}

export default function createCache(key: string) {
  let styleSheetText = "";
  const cached = new Set();
  let temp: Temp[] = [];

  function add(hash: string, styleText: string) {
    if (cached.has(hash)) return;
    temp.push({ hash, styleText });
  }

  function genStyleSheetText() {
    let res = "";

    temp.forEach((node) => {
      const className = `${key}-${node.hash}`;
      const classText = `.${className}{${node.styleText}}`;
      res += classText;
      cached.add(node.hash);
    });

    temp = [];
    return (styleSheetText += res);
  }

  function tempSize () {
    return temp.length
  }

  return {
    add,
    tempSize,
    genStyleSheetText,
  };
}
