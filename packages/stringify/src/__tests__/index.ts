import { error } from "../enum/errorMsg";
import type { StyleObject } from "..";
import { getStyleString, getKeyframesString } from "..";

describe("class-css-stringify", () => {
  it("getStyleString normal", () => {
    const styleObject: StyleObject = {
      color: "red",
      fontSize: 12,
      flex: 1,
      padding: "12px",
      "&:hover": {
        background: "black",
      },
      " & + &": {
        marginTop: 10,
      },
    };

    const styleObjectString =
      ".my-button:hover{background:black;} .my-button + .my-button{margin-top:10px;}.my-button{color:red;font-size:12px;flex:1;padding:12px;}";
    expect(getStyleString("my-button", styleObject)).toBe(styleObjectString);
  });

  it("getStyleString throw noClassName Error.", () => {
    expect(() => getStyleString("", {})).toThrow(error.NO_CLASS_NAME);
  });

  it("getKeyframesString", () => {
    const keyframesObject: StyleObject = {
      from: {
        color: "red",
        flex: 1,
        fontSize: 12,
        padding: "12px",
      },
      to: {
        color: "red",
        flex: 1,
        fontSize: 12,
        padding: "12px",
      },
    };

    const keyframesString =
      "@keyframes appear{from{color:red;flex:1;font-size:12px;padding:12px;}to{color:red;flex:1;font-size:12px;padding:12px;}}";

    expect(getKeyframesString("appear", keyframesObject)).toBe(keyframesString);
  });

  it("getKeyframesString throw no keyframesName Error.", () => {
    expect(() => getKeyframesString("", {})).toThrow(error.NO_KEYFRAMES_NAME);
  });
});
