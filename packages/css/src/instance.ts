import hash from "class-css-hash";
import { getStyleString } from "class-css-stringify";
import { shallowEqualObject } from "./utils";
import { Render, CacheUnit } from "class-css-render";
import { getKeyframesString } from "class-css-stringify";

export type Hash = (str: string) => string;

export interface InstanceConfig {
  id: string;
  hash?: Hash;
}

const CLASS_NAME_PLACEHOLDER = "_@@_";
const CLASS_NAME_PLACEHOLDER_REG = new RegExp(CLASS_NAME_PLACEHOLDER, 'g')
const DEFAULT_ID = "css";

type GetStyleObject = (data: IObject) => StyleObject;
type CSSReturn = (data: IObject) => string;
export class Instance {
  private id: string = "";
  private render: Render | null = null;
  private cache: Map<string, CacheUnit> = null;
  private hash: Hash | null = null;

  constructor(config?: InstanceConfig) {
    this.id = config?.id || DEFAULT_ID;
    this.render = new Render({ id: this.id });
    this.cache = this.getCache(this.id);
    this.hash = config?.hash || hash;
  }

  // get global cache.
  private getCache(id: string): Map<string, CacheUnit> {
    if (!window["class_css_global"]) {
      window["class_css_global"] = {};
    }
    if (!window["class_css_global"]["cache"]) {
      window["class_css_global"]["cache"] = new Map<string, Set<string>>();
    }

    if (!window["class_css_global"]["cache"][id]) {
      window["class_css_global"]["cache"][id] = new Map<string, CacheUnit>();
    }

    return window["class_css_global"]["cache"][id];
  }

  // create dynamic class.
  private createClass(styleObject: StyleObject): string {
    const tempText: string = getStyleString(
      CLASS_NAME_PLACEHOLDER,
      styleObject
    );
    const hashText: string = this.hash(tempText);

    if (!this.cache.has(hashText)) {
      const className = `${this.id}-${hashText}`;
      this.cache.set(hashText, {
        className,
        styleText: tempText.replace(CLASS_NAME_PLACEHOLDER_REG, className),
      });
    }

    const cacheUnit: CacheUnit | undefined = this.cache.get(hashText);

    if (cacheUnit) {
      this.render.render(cacheUnit);
    }

    return cacheUnit?.className || "";
  }

  // support variable.
  private createClassCreator(
    getStyleObject: GetStyleObject,
    initial: IObject
  ): CSSReturn {
    let styleObject: StyleObject = getStyleObject(initial);
    let className = this.createClass(styleObject);

    return function (data: IObject) {
      const currentStyleObject = getStyleObject(data);
      // compare latest value. (for future pre-build.)
      if (shallowEqualObject(currentStyleObject, styleObject)) {
        return className;
      }
      return this.createClass(currentStyleObject);
    }.bind(this);
  }

  public css(styleObject: StyleObject): string;
  public css(getStyleObject: GetStyleObject, initial: IObject): CSSReturn;
  public css(
    styleObject: StyleObject | GetStyleObject,
    initial?: IObject
  ): string | CSSReturn {
    if (typeof styleObject === "object") return this.createClass(styleObject);
    if (!initial) {
      throw Error("initial must be set.");
    }
    return this.createClassCreator(styleObject, initial).bind(this);
  }

  public keyframes(styleObject: StyleObject) {
    const tempText: string = getKeyframesString(
      CLASS_NAME_PLACEHOLDER,
      styleObject
    );

    const hashText: string = this.hash(tempText);

    if (!this.cache.has(hashText)) {
      const className = `keyframes-${this.id}-${hashText}`;
      this.cache.set(hashText, {
        className,
        styleText: tempText.replace(CLASS_NAME_PLACEHOLDER_REG, className),
      });
    }

    const cacheUnit: CacheUnit | undefined = this.cache.get(hashText);

    if (cacheUnit) {
      this.render.render(cacheUnit);
    }

    return cacheUnit?.className || "";
  }
}
