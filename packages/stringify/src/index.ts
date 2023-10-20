/**
 * style对象转字符串
 */

import getStyleSheetList, {
  styleSheetListToString,
} from "./utils/getStyleSheetList";

export type StyleObjectValue = StyleObject | string | number;
export interface StyleObject {
  [k: string]: StyleObjectValue;
}

export default function getStyleString(className: string, style: StyleObject) {
  if (!className) {
    throw new Error('getStyleString must input "className"');
  }
  const tagClassName = '.' + className;
  const list = getStyleSheetList(tagClassName, style);
  return styleSheetListToString(list);
}
