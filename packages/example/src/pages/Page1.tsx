import styles from "./Page1.module.less";
import { useState } from "react";
import { Space, Radio, Button } from "antd";
import { css, createClassCss } from "class-css";

const { css: css2 } = createClassCss({ key: "tiger-ui" });

export default function Page1() {
  const [color, setColor] = useState("blue");
  return (
    <Space direction="vertical">
      Page1
      <Button>按钮一</Button>
      <button className={styles.myButton}>按钮一</button>
      <Radio.Group
        value={color}
        onChange={(e) => setColor(e.target.value)}
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: "蓝色", value: "blue" },
          { label: "红色", value: "red" },
          { label: "绿色", value: "green" },
          { label: "黄色", value: "yellow" },
        ]}
      />
      <div>
        参照组：
        <button
          className={css({
            background: "yellow",
            border: "none",
          })}
        >
          StyleCss按钮
        </button>
      </div>
      <div>
        改变状态：
        <button
          className={css({
            background: color,
            border: "none",
          })}
        >
          StyleCss按钮
        </button>
        <button
          className={css({
            background: color,
            border: "none",
          })}
        >
          StyleCss按钮
        </button>
      </div>
    </Space>
  );
}
