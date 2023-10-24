import { StyleObject } from "..";
import { getStyleRules, stringifyRules } from "./getStyleRuleText";

interface Keyframes {
  name: string;
  ruleText: string[];
}

// 合法的key（from、to、'1%'）
const LEGAL_KEY_REG = /^(\d{1,2}%|from|to|100%)$/;
function isLegalKey(key: string) {
  return LEGAL_KEY_REG.test(key);
}

function isObject(value: any) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * 获取样式规则文本
 * @param keyframeName keyframe名称
 * @param styleObject 样式规则对象
 */
export default function getKeyframesRuleText(
  keyframeName: string,
  styleObject: StyleObject
) {
  const keyframes: Keyframes = {
    name: keyframeName,
    ruleText: [],
  };

  if (!isObject(styleObject)) {
    throw new Error("style must a object.");
  }

  for (const key in styleObject) {
    if (!isLegalKey(key)) {
      throw new Error('keyframe key must like: "from"、"to"、"0%"、"100%"');
    }

    const value: any = styleObject?.[key];
    if (!isObject(value)) {
      throw new Error("value must a object.");
    }

    keyframes.ruleText.push(key + stringifyRules(getStyleRules("", value)));
  }
  return stringifyKeyframesRules(keyframes);
}

function stringifyKeyframesRules(keyframe: Keyframes) {
  const rulesText = keyframe.ruleText.join("");
  return `@keyframes ${keyframe.name}{${rulesText}}`;
}
