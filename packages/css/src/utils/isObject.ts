/**
 * isObject
 * 
 * @author tangjiahui
 * @date 2024/3/14
 */
export function isObject(o: any) : boolean {
  return typeof o === "object" && !!o;
}