import { error } from "../../enum/errorMsg";
import getStyleRuleText, {
  getStyleRules,
  stringifyRules,
} from "../getStyleRuleText";

describe("class-css-stringify", () => {
  const obj = {
    flex: 1,
    padding: "10px",
    fontSize: 12,
    "&:hover": {
      background: "black",
    },
  };
  const str =
    "my-button:hover{background:black;}my-button{flex:1;padding:10px;font-size:12px;}";

  it("getStyleRuleText", () => {
    expect(getStyleRuleText("my-button", obj)).toBe(str);
    expect(() =>
      getStyleRuleText("my-button", {
        "&": "11",
      })
    ).toThrow(error.NOT_STYLE_VALUE);
  });

  it("getStyleRules", () => {
    const rules = getStyleRules(".my-button", obj);
    const rule = rules.find((x) => x.className === ".my-button");
    expect(rule.className === ".my-button").toBeTruthy();
    expect(rule.declaration.includes("font-size:12px")).toBeTruthy();
  });

  it("stringifyRules", () => {
    expect(
      stringifyRules([
        { className: ".my-btn", declaration: ["color:red", "background:red"] },
      ])
    ).toBe(".my-btn{color:red;background:red;}");

    expect(stringifyRules([{ className: ".my-btn", declaration: [] }])).toBe(
      ".my-btn{}"
    );
  });
});
