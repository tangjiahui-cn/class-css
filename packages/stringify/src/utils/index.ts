// 驼峰式 转 横线间隔
export function transformKey(key: string) {
  let res = key.replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
  if (res?.[0] === "-") {
    res = res.slice(1);
  }
  return res;
}
