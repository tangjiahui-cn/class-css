/**
 * style对象转字符串
 */

interface StyleObject {
  [k: string]: number | string;
}
export default function getStyleString(style: StyleObject) {
  const list: string[] = [];
  for (const k in style) {
    list.push(`${k}:${style[k]}`);
  }
  const str = list.join(";");
  return str ? str + ";" : "";
}
