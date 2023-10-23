/**
 * 执行器
 *
 * tips: 用来管理style标签的更新
 */
export default function createExecutor(key: string) {
  let tagList = [];
  tagList = getTagList(key);
  let style: HTMLStyleElement | undefined = undefined;
  let textNode: Text | undefined = undefined;

  // 确保全局每个key只存在一个style标签
  // 后续创建同类的执行器，都只会操作相同标签
  if (tagList.length) {
    deleteOtherTag();
    style = tagList?.[0];
    textNode = (style?.firstChild as any) || document.createTextNode("");
  } else {
    style = createNewTag();
    textNode = document.createTextNode("");
    style.appendChild(textNode);
    document.head.appendChild(style);
  }

  // 创建新的style标签
  function createNewTag() {
    const style = document.createElement("style");
    style.setAttribute("class-css", key);
    return style;
  }

  // 获取全部的style标签列表
  function getTagList(key: string): HTMLElement[] {
    return (tagList = document.head.querySelectorAll(
      `style[class-css=${key}]`
    ) as any);
  }

  // 更新style下的textNode节点
  function update(styleText: string): void {
    textNode.nodeValue = styleText;
  }

  // 清空标签下所有内容
  function deleteOtherTag(): void {
    if (!tagList.length) return;
    let i = 1;
    while (i < tagList.length) {
      const tag = tagList[i];
      document.head.removeChild(tag);
    }
    tagList = Array.prototype.slice.call(tagList, 0, 1);
  }

  return {
    update,
    getTagList
  };
}
