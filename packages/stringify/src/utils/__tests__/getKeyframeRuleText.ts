import { error } from "../../enum/errorMsg";
import getKeyframesRuleText, {
  isLegalKey,
  isObject,
  stringifyKeyframesRules,
} from "../getKeyframeRuleText";

describe("class-css-stringify", () => {
  it("getKeyframesRuleText", () => {
    expect(
      getKeyframesRuleText("appear", { from: { flex: 1 }, to: { flex: 2 } })
    ).toBe("@keyframes appear{from{flex:1;}to{flex:2;}}");
    expect(
      getKeyframesRuleText("appear", { "0%": { flex: 1 }, "100%": { flex: 2 } })
    ).toBe("@keyframes appear{0%{flex:1;}100%{flex:2;}}");
    // error check.
    // expect(() =>
    //   getKeyframesRuleText("appear", { "0%": { flex: 1 }, "300%": { flex: 2 } })
    // ).toThrow(error.NOT_KEYFRAMES_KEY);
    // expect(() =>
    //   getKeyframesRuleText("appear", {
    //     "-10%": { flex: 1 },
    //     "100%": { flex: 2 },
    //   })
    // ).toThrow(error.NOT_KEYFRAMES_KEY);
    // expect(() =>
    //   getKeyframesRuleText("appear", { from2: { flex: 1 }, to: { flex: 2 } })
    // ).toThrow(error.NOT_KEYFRAMES_KEY);
    expect(() => getKeyframesRuleText("appear", { from: 1, to: 2 })).toThrow(
      error.NOT_OBJECT
    );
  });

  it("isLegalKey", () => {
    expect(isLegalKey("from")).toBeTruthy();
    expect(isLegalKey("to")).toBeTruthy();
    expect(isLegalKey("0%")).toBeTruthy();
    expect(isLegalKey("100%")).toBeTruthy();
    expect(isLegalKey("x")).toBeFalsy();
    expect(isLegalKey("y")).toBeFalsy();
    expect(isLegalKey("-1%")).toBeFalsy();
    expect(isLegalKey("101%")).toBeFalsy();
    expect(isLegalKey(1)).toBeFalsy();
  });

  it("isObject", () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(() => {})).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject(Symbol())).toBeFalsy();
  });

  it("stringifyKeyframesRules", () => {
    expect(
      stringifyKeyframesRules({
        name: "appear",
        ruleText: ["from{color:red;}", "to{color:green;}"],
      })
    ).toBe("@keyframes appear{from{color:red;}to{color:green;}}");

    expect(
      stringifyKeyframesRules({
        name: "appear",
        ruleText: [],
      })
    ).toBe("@keyframes appear{}");
  });
});
