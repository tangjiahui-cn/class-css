/**
 * style对象转字符串
 */

import getStyleSheetList, {
  styleSheetListToString,
} from "./utils/getStyleSheetList";
import stringifyKeyframe from "./utils/stringifyKeyframes";

export type StyleObjectValue = StyleObject | string | number;
export interface StyleObject {
  [k: string]: StyleObjectValue;
}

export function getStyleString(className: string, style: StyleObject) {
  if (!className) {
    throw new Error('getStyleString must input "className"');
  }
  const tagClassName = "." + className;
  const list = getStyleSheetList(tagClassName, style);
  return styleSheetListToString(list);
}

export function getKeyframesString(keyframesName: string, style: StyleObject) {
  const keyframesStr = stringifyKeyframe(style);
  return `@keyframes ${keyframesName}${keyframesStr}`;
}
