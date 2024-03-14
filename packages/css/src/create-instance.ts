import { Instance } from "./instance";

export interface Options {
  key: string; // 唯一key
  hash?: (value: string) => string; // 计算hash函数
}
export function createClassCss(options: Options): Instance {
  return new Instance({
    id: options?.key,
    hash: options?.hash,
  });
}
