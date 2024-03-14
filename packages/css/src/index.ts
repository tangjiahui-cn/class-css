import { createClassCss } from "./create-instance";
import { Instance } from "./instance";
export * from "./instance";

const instance = new Instance({
  id: "css",
});
const css = instance.css.bind(instance);
const keyframes = instance.keyframes.bind(instance);

export { createClassCss, css, keyframes };
