import { Instance } from "./instance";

export interface Options {
  key: string; // 唯一key
  hash?: (value: string) => string; // 计算hash函数
}
export function createClassCss(
  options: Options
): Pick<Instance, "css" | "keyframes"> {
  const ins = new Instance({
    id: options?.key,
    hash: options?.hash,
  });

  return {
    css: ins.css.bind(ins),
    keyframes: ins.keyframes.bind(ins),
  };
}
