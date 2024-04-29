import {
  Box,
  Tab as MuiTab,
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Typography,
} from "@mui/material";
import { IconProps } from "@phosphor-icons/react";
import { Bank, ClockCounterClockwise, ShoppingCart } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Tabs = {
  labels: string[];
  content: JSX.Element[];
};

type TabsProps = {
  value: MuiTabsProps["value"];
  onChange: MuiTabsProps["onChange"];
  tabs: Tabs;
};

const iconMap: Record<
  string,
  ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
> = {
  "Withdrawal Request": Bank,
  "Withdrawal History": ClockCounterClockwise,
  "Cards Shop": ShoppingCart,
};

const getLabel = (label: string) => {
  const Icon = iconMap[label];

  return (
    <Box key={1} component="span" display="flex" alignItems="center">
      {/* <Icon size={20} /> */}
      <Typography component="span" marginLeft={1}>
        {label}
      </Typography>
    </Box>
  );
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
          <MuiTab className="tab-label" key={label} label={getLabel(label)} />
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


