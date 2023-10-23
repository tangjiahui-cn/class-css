import { StyleObject } from "..";
import getStyleSheetList, { styleSheetListToString } from "./getStyleSheetList";

// 合法的key（from、to、'1%'）
const LEGAL_KEY_REG = /^\d{1,2}%$/;
function isLegalKey(key: string) {
  return (
    key === "from" || key === "to" || key === "100%" || LEGAL_KEY_REG.test(key)
  );
}

function isObject(value: any) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default function stringifyKeyframe(style: StyleObject): string {
  if (!isObject(style)) {
    throw new Error("style must a object.");
  }

  const list: string[] = [];

  for (const key in style) {
    if (!isLegalKey(key)) {
      throw new Error('keyframe key must like: "from"、"to"、"0%"、"100%"');
    }

    const value: any = style[key];
    if (!isObject(value)) {
      throw new Error("value must a object.");
    }

    list.push(key + styleSheetListToString(getStyleSheetList("", value)));
  }
  return list?.length ? `{${list.join("")}}` : "";
}
