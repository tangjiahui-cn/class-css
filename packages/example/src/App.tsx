import { useState } from 'react';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import { Tabs } from 'antd';

function App() {
  const [activeKey, setActiveKey] = useState('1');
  return (
    <div>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.TabPane tab='选项一' key='1'/>
        <Tabs.TabPane tab='选项二' key='2'/>
      </Tabs>
      {activeKey === '1' && <Page1 />}
      {activeKey === '2' && <Page2 />}
    </div>
  );
}

export default App;
