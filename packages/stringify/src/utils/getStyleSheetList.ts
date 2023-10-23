import { transformKey } from ".";
import type { StyleObject, StyleObjectValue } from "..";
import isUnitLessProp from "./unitLess";

export interface StyleSheetItem {
  className: string; // 类名
  list: string[]; // 键值字符串(['k:v', 'k:v'])
}

export function styleSheetListToString(
  styleSheetList: StyleSheetItem[]
): string {
  return styleSheetList.reduce((res, style) => {
    const styles = style.list?.length
      ? `${style.className}{${style.list.join(";")}}`
      : "";
    return res + styles;
  }, "");
}

export default function getStyleSheetList(
  className: string,
  styleObject: StyleObject
): StyleSheetItem[] {
  // 样式表值列表（保存类名，对应样式表值）
  const styleSheetList: StyleSheetItem[] = [];

  // 遍历样式对象，结果保存在styleSheetList
  function lookStyleObject(className: string, styleObject: StyleObject) {
    const item: StyleSheetItem = {
      className: className,
      list: [],
    };

    for (const propKey in styleObject) {
      let value: StyleObjectValue = styleObject[propKey];
      const isSign = propKey.includes("&");
      const isValueObject = typeof value === "object";

      // 包含 & 且值不是对象的，则不符合规则。
      if (isSign && !isValueObject) {
        throw new Error(`which propKey has '&', the value must a object.`);
      }

      if (isValueObject) {
        const className: string = propKey.replace(/&/g, `${item.className}`);
        lookStyleObject(className, value as any);
      } else {
        if (!isUnitLessProp(propKey) && typeof value === "number") {
          value = value + "px";
        }
        item.list.push(`${transformKey(propKey)}: ${value}`);
      }
    }
    styleSheetList.push(item);
  }

  lookStyleObject(className, styleObject);
  return styleSheetList;
}
