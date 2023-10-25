import { error } from "../enum/errorMsg";
import { transformKey } from ".";
import { StyleObject, StyleObjectValue } from "..";
import isUnitLessProp from "./unitLess";

interface Rule {
  // 类名
  className: string;
  // 规则声明 (propKey:value)
  declaration: string[];
}

/**
 * 获取样式规则
 * @param className 样式类名
 * @param styleObject 样式规则对象
 */
export function getStyleRules(
  className: string,
  styleObject: StyleObject
): Rule[] {
  // 样式表值列表（保存类名，对应样式表值）
  const rules: Rule[] = [];

  // 遍历样式对象，结果保存在styleSheetList
  function lookStyleObject(className: string, styleObject: StyleObject) {
    const rule: Rule = {
      className: className,
      declaration: [],
    };

    for (const propKey in styleObject) {
      let value: StyleObjectValue = styleObject[propKey];
      const isSign = propKey.includes("&");
      const isValueObject = typeof value === "object";

      // 包含 & 且值不是对象的，则不符合规则。
      if (isSign && !isValueObject) {
        throw new Error(error.NOT_STYLE_VALUE);
      }

      if (isValueObject) {
        const className: string = propKey.replace(/&/g, `${rule.className}`);
        lookStyleObject(className, value as any);
      } else {
        if (!isUnitLessProp(propKey) && typeof value === "number") {
          value = value + "px";
        }
        rule.declaration.push(`${transformKey(propKey)}:${value}`);
      }
    }
    rules.push(rule);
  }

  lookStyleObject(className, styleObject);
  return rules;
}

/**
 * 获取样式规则文本
 * @param className 样式类名
 * @param styleObject 样式规则对象
 */
export default function getStyleRuleText(
  className: string,
  styleObject: StyleObject
): string {
  return stringifyRules(getStyleRules(className, styleObject));
}

/**
 * 将style规则集转化为文本
 * @param rules 样式规则集
 * @returns
 */
export function stringifyRules(rules: Rule[]): string {
  return rules.reduce((res, rule) => {
    const endSign = rule.declaration.length ? ";" : "";
    const ruleText = `${rule.className}{${rule.declaration.join(
      ";"
    )}${endSign}}`;
    return res + ruleText;
  }, "");
}
