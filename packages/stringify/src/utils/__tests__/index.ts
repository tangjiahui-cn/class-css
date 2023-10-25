import { transformKey } from "..";

describe("class-css-stringify", () => {
  it("transformKey", () => {
    expect(transformKey("HelloWorld")).toBe("hello-world");
    expect(transformKey("helloWorld")).toBe("hello-world");
    expect(transformKey("Hello-world")).toBe("hello-world");
    expect(transformKey("Hello-worlD")).toBe("hello-worl-d");
  });
});
