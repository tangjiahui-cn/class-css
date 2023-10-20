import { css } from "class-css";
import styles from "./Page2.module.less";

export default function Page2() {
  return (
    <div>
      Page1
      <button className={styles.myButton}>按钮二</button>
      <button
        className={css({
          background: "blue",
          border: "none",
        })}
      >
        StyleCss按钮
      </button>
    </div>
  );
}
