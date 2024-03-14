/**
 * Render
 *
 * @author tangjiahui
 * @date 2024/3/14
 * @description render cache to web page.
 */
const DEFAULT_ID = "css";

export type CacheUnit = {
  className: string;
  styleText: string;
};

export type RenderConfig = {
  id: string;
};

export class Render {
  private id: string | null;
  private tag: HTMLStyleElement | null = null;
  private renderedCache: Set<string> | null = null;

  constructor(config?: RenderConfig) {
    this.id = config?.id || DEFAULT_ID;
    this.tag = this.getGlobalTag(this.id);
    this.renderedCache = this.getRenderedCache(this.id);
  }

  /**
   * get global cache.
   */
  private getRenderedCache(id: string): Set<string> {
    if (!window["class_css_global"]) {
      window["class_css_global"] = {};
    }
    if (!window["class_css_global"]["renderedCache"]) {
      window["class_css_global"]["renderedCache"] = new Map<
        string,
        Set<string>
      >();
    }

    if (!window["class_css_global"]["renderedCache"][id]) {
      window["class_css_global"]["renderedCache"][id] = new Set<string>();
    }

    return window["class_css_global"]["renderedCache"][id];
  }

  /**
   * create a style tag.
   */
  private getTag() {
    if (!this.id) {
      throw Error("id must be set.");
    }
    if (!this.tag) {
      this.tag = document.createElement("style");
      this.tag.setAttribute("class-css", this.id);
      document.head.appendChild(this.tag);
    }
    return this.tag;
  }

  /**
   * get global style tag if it exist.
   */
  private getGlobalTag(id: string): HTMLStyleElement | null {
    const tags: NodeListOf<HTMLStyleElement> = document.head.querySelectorAll(
      `style[class-css='${id}']`
    );
    return tags[tags.length - 1] || null;
  }

  public render(cacheUnit: CacheUnit) {
    if (!this.id) {
      throw Error("id must be set");
    }
    if (!this.renderedCache) {
      this.renderedCache = this.getRenderedCache(this.id || "");
    }

    if (this.renderedCache.has(cacheUnit.className)) {
      return;
    }
    const tag = this.getTag();
    tag.innerHTML += cacheUnit.styleText;
    this.renderedCache.add(cacheUnit.className);
  }
}
