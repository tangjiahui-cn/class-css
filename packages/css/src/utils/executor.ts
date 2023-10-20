/**
 * 
 * @param 执行器
 * @returns 
 */
export default function createExecutor(key: string) {
  const style = document.createElement("style");
  const textNode = document.createTextNode("");
  style.setAttribute("class-css", key);
  style.appendChild(textNode);
  document.head.appendChild(style);

  function update(styleText: string) {
    textNode.nodeValue = styleText;
  }

  return {
    update,
  };
}
