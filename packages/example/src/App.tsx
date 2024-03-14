import { useState } from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { Tabs } from "antd";
import { Render } from "class-css-render";
import { Instance } from "class-css";
export const ins = new Instance({
  id: 'zzzz'
});

const renderer = new Render({
  id: "css-2",
});
renderer.render({
  className: "t-zzz",
  styleText: ".color{color: red};",
});

const preCss = ins.css(
  (data) => {
    return {
      color: data.color
    };
  },
  {
    color: "red",
  }
);

function App() {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.TabPane tab="选项一" key="1" />
        <Tabs.TabPane tab="选项二" key="2" />
      </Tabs>
      {activeKey === "1" && <Page1 />}
      {activeKey === "2" && <Page2 />}
    </div>
  );
}

export default App;
