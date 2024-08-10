import { Tab, Tabs } from "@nextui-org/react";
import { memo } from "react";
import ComingSoon from "./CommingSoon";
import Text from "./Text";
import { cn } from "@/lib/utils";

interface ITab {
  key: string;
  title?: string;
  icon?: any;
  showSoon?: boolean;
  textComingSoon?: string;
  component?: any;
}
const CustomTabs = ({
  tabs,
  selected,
  setSelected,
  textComingSoon,
  maxContent,
}: {
  tabs: ITab[];
  selected?: string;
  setSelected?: any;
  textComingSoon?: string;
  maxContent?: boolean;
}) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        // color="text-primary"
        variant="underlined"
        classNames={{
          tabList: "w-full relative rounded-none p-0 border-b border-divider ",
          cursor: "w-full bg-brand-500 rounded-t-[16px] h-1 ",
          tab: maxContent ? "h-auto w-max p-0 pb-[19px] pr-4 md:mr-4" : "h-auto p-0 pb-[19px] pr-4 md:mr-0 ",
          tabContent: "group-data-[selected=true]:text-brand-500 w-max",
        }}
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center gap-2 w-full justify-center">
                  <div className="flex items-center gap-2 py-[2px]">
                    {tab?.icon && tab.icon}
                    {tab.title && <Text type="font-16-600">{tab.title}</Text>}
                  </div>

                  {tab.showSoon && <ComingSoon textComingSoon={textComingSoon} />}
                </div>
              }
            >
              {tab?.component}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
export default memo(CustomTabs);
