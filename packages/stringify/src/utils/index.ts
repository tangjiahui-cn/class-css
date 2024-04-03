// 驼峰式 转 横线间隔
export function transformKey(key: string) {
  let res = key.replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
  return res;
}