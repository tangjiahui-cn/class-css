/**
 * shallowEqualObject
 *
 * @author tangjiahui
 * @date 2024/3/14
 * @description shallow compare object value.
 */
import { isObject } from ".";

export function shallowEqualObject(a: IObject, b: IObject): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (!keysA.length) return keysA.length === keysB.length;
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    const valueA: any = a[keysA[i]];
    const valueB: any = b[keysB[i]];
    if (isObject(valueA)) {
      if (isObject(valueB)) {
        if (!shallowEqualObject(valueA, valueB)) {
          return false;
        }
      } else {
        return false;
      }
    } else if (valueA !== valueB) {
      return false;
    }
  }
  return true;
}
