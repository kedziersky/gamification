import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export const TabViewComponent = ({ renderView }: any) => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderTabs = () => {
    return renderView.map((item: any, index: number) => (
      <Tab
        className={`tab focus:outline-none ${
          index === tabIndex ? "tab-active" : ""
        }`}
      >
        {item.name}
      </Tab>
    ));
  };
  const renderTabPanel = () => {
    return renderView.map((item: any, index: number) => (
      <TabPanel key={index}>{item.component}</TabPanel>
    ));
  };
  return (
    <div>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="tabs tabs-boxed mb-5 justify-center w-fit mx-auto">
          {renderTabs()}
        </TabList>

        {renderTabPanel()}
      </Tabs>
    </div>
  );
};
