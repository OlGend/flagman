import {
  Box,
  Tab as MuiTab,
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
} from "@mui/material";

type Tabs = {
  labels: (string | JSX.Element)[];
  content: JSX.Element[];
};

type TabsProps = {
  value: MuiTabsProps["value"];
  onChange: MuiTabsProps["onChange"];
  tabs: Tabs;
};

export const Tabs = ({ value, onChange, tabs }: TabsProps) => {
  return (
    <>
      <MuiTabs
        className="tabs_pagination"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={onChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {tabs.labels.map((label) => (
          <MuiTab className="tab-label" key={0} label={label} />
        ))}
      </MuiTabs>
      {tabs.content.map((content, idx) => (
        <TabPanel key={idx} index={idx} value={value} className="tab_panel">
          {content}
        </TabPanel>
      ))}
    </>
  );
};

type TabPanelProps = {
  index: number;
  value: number;
  children: React.ReactNode;
  className?: string;
};

const TabPanel = ({ children, value, index, className }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%" }}
      className={className}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
