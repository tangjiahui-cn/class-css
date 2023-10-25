/**
 * style对象转字符串
 */
import getStyleRuleText from "./utils/getStyleRuleText";
import getKeyframesRuleText from "./utils/getKeyframeRuleText";
import { error } from "./enum/errorMsg";

export type StyleObjectValue = StyleObject | string | number;
export type StyleObject = React.CSSProperties & {
  [k: string]: StyleObjectValue;
}

/**
 * 获取style标签规则文本
 * @param className 类名
 * @param styleObject 规则对象
 * @returns
 */
export function getStyleString(className: string, styleObject: StyleObject) {
  if (!className) {
    throw new Error(error.NO_CLASS_NAME);
  }
  const tagClassName = "." + className;
  return getStyleRuleText(tagClassName, styleObject);
}

/**
 * 获取keyframes规则文本
 * @param keyframesName keyframes名称
 * @param styleObject 规则对象
 * @returns
 */
export function getKeyframesString(keyframesName: string, style: StyleObject) {
  if (!keyframesName) {
    throw new Error(error.NO_KEYFRAMES_NAME);
  }
  return getKeyframesRuleText(keyframesName, style);
}

export default {
  getStyleString,
  getKeyframesString,
};
