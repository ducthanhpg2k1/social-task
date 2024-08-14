import Text from "@/components/ui/Text";
import { Button, Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";

const DATA_BUZZY_PROCESS = [
  {
    id: 1,
    title: "Campaign Setup",
    description: "Begin by creating your campaign, defining your goals and budget to ensure precision in execution.",
  },
  {
    id: 2,
    title: "Select Audience",
    description: "Next step, choose the right audience demographics align with your brand and campaign goals",
  },
  {
    id: 3,
    title: "Launch Campaign",
    description:
      "Deploy your campaign across selected publisher platforms, utilizing Buzzy’s tools to manage progress automatically.",
  },
  {
    id: 4,
    title: "Analyze and Optimize",
    description:
      "Review campaign performance through Buzzy’s analytics dashboard to refine and enhance future campaigns.",
  },
];

const BuzzyProcess = () => {
  return (
    <div className="flex flex-col gap-8 mt-10">
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <Button className="bg-white/5 w-max border border-white/10 py-2 px-4 max-h-8">
            <Text className="font-medium text-xs text-[#A6F] uppercase">How it works?</Text>
          </Button>
          <Text className="font-semibold text-4xl text-white w-[580px] border-top">
            Understanding Buzzy Process to Get Started
          </Text>
        </div>
        <Tabs
          classNames={{
            tabList: ["bg-[rgba(255_255_255_0.02)] h-[48px] p-0 border border-white/5"],
            tab: ["h-full"],
            tabContent: "group-data-[selected=true]:text-[#A6F] text-white/50 text-[14px] font-semibold",
            cursor: "bg-[#A6F2] rounded-none",
          }}
          radius="lg"
        >
          <Tab key="advertisers" title={"For Advertisers"} />
          <Tab key="publisher" title={"For Advertisers"} />
        </Tabs>
      </div>

      <div className="flex">
        {DATA_BUZZY_PROCESS?.map((item, index) => {
          return (
            <div
              key={item?.id}
              className="flex justify-center items-center p-[0px_0px_32px_32px] flex-col gap-8 text-center"
            >
              <div className="flex items-center relative w-full justify-center">
                <CircleNumber index={index} />
              </div>
              <div className="flex flex-col gap-4 text-center justify-center items-center">
                <Text className="text-white/90 text-[18px] font-semibold leading-6">{item?.title}</Text>
                <Text type="font-14-400" className="text-white/50 w-[85%]">
                  {item?.description}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BuzzyProcess;

const CircleNumber = ({ index }: { index: number }) => {
  return (
    <div className="w-16 h-16 p-4 bg-white/5 rounded-full flex justify-center items-center">
      <div
        className={clsx("w-8 h-8 rounded-full flex justify-center items-center", {
          ["bg-[#FCD34D]"]: index === 0,
          ["bg-[#7DD3FC]"]: index === 1,
          ["bg-[#F390C2]"]: index === 2,
          ["bg-[#6EE7B7]"]: index === 3,
        })}
      >
        <Text className="text-[#171627]" type="font-14-600">
          {index + 1}
        </Text>
      </div>
    </div>
  );
};
