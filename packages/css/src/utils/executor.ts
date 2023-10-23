/**
 * 执行器
 *
 * tips: 用来管理style标签的更新
 */

export default function createExecutor(key: string) {
  let text: Text;
  let style: HTMLStyleElement;
  const tags: HTMLStyleElement[] = getTagList(key);

  if (tags.length) {
    // 如果全局存在style标签
    deleteOtherTag(tags);
    style = tags[0];
    text = (style?.firstChild as any) || document.createTextNode("");
  }

  function lazyMount() {
    text = document.createTextNode("");
    style = document.createElement("style");
    style.setAttribute("class-css", key);
    style.appendChild(text);
    document.head.appendChild(style);
  }

  // 获取全部的style标签列表
  function getTagList(key: string): HTMLStyleElement[] {
    return (
      (document.head.querySelectorAll(`style[class-css=${key}]`) as any) || []
    );
  }

  // 更新样式表
  function updateStyleSheet(styleText: string): void {
    if (!style) {
      lazyMount();
    }
    text.nodeValue = styleText;
  }

  // 仅保留最后一个style标签
  function deleteOtherTag(tagList = []): void {
    if (tagList.length < 2) return;
    let i = 0;
    while (i <= tagList.length - 2) {
      const tag = tagList[i--];
      document.head.removeChild(tag);
    }
    tagList = Array.prototype.slice.call(tagList, tagList.length - 1);
  }

  return {
    updateStyleSheet,
    getTagList,
  };
}
