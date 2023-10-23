import styles from "./Page1.module.less";
import { useState } from "react";
import { Space, Radio, Button } from "antd";
import { createClassCss, css, keyframes } from "class-css";

const appear = keyframes({
  from: {
    background: "yellow",
  },
  to: {
    background: "blue",
  },
});

const disAppear = keyframes({
  from: {
    background: "blue",
  },
  to: {
    background: "yellow",
  },
});

export default function Page1() {
  const [color, setColor] = useState("blue");
  const [isAppear, setIsAppear] = useState("1");
  
  return (
    <Space direction="vertical">
      Page1
      <Button onClick={() => createClassCss({key: 'css'})}>新建css</Button>
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
      <Radio.Group
        value={isAppear}
        onChange={(e) => setIsAppear(e.target.value)}
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: "黄 -> 蓝", value: "1" },
          { label: "蓝 -> 黄", value: "2" },
        ]}
      />
      <div>
        参照组：
        <button
          className={css({
            background: "yellow",
            border: "none",
            animation: `${isAppear === "1" ? appear : disAppear} 3s`,
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
