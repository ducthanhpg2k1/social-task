import Text from "@/components/ui/Text";
import { Accordion, AccordionItem, Button, Tab, Tabs } from "@nextui-org/react";

const DATA_FAQS = [
  {
    id: 1,
    title: "How is revenue calculated and paid out?",
    content:
      "Integrating the Buzzy SDK is straightforward. We provide detailed documentation and a step-by-step guide to help you through the process. Our support team is also available to assist you if you encounter any issues.",
  },
  {
    id: 2,
    title: "Can I choose which advertisers to work with?",
    content:
      "Integrating the Buzzy SDK is straightforward. We provide detailed documentation and a step-by-step guide to help you through the process. Our support team is also available to assist you if you encounter any issues.",
  },
  {
    id: 3,
    title: "How do I integrate Buzzy’s SDK into my website?",
    content:
      "Integrating the Buzzy SDK is straightforward. We provide detailed documentation and a step-by-step guide to help you through the process. Our support team is also available to assist you if you encounter any issues.",
  },
  {
    id: 4,
    title: "What types of tasks will be available for my audience?",
    content:
      "Integrating the Buzzy SDK is straightforward. We provide detailed documentation and a step-by-step guide to help you through the process. Our support team is also available to assist you if you encounter any issues.",
  },
];

const Faqs = () => {
  return (
    <div className="flex flex-col gap-8 mt-10 ">
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <Button className="bg-white/5 w-max border border-white/10 py-2 px-4 max-h-8">
            <Text className="font-medium text-xs text-[#A6F] uppercase">FAQs</Text>
          </Button>
          <Text className="font-semibold text-4xl text-white w-[580px] border-top">
            Get Answers Everything You Need to Success
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
      <Accordion
        itemClasses={{
          content: ["py-0 pb-4"],
          base: ["bg-transparent border-2 border-white/5 gap-4"],
          indicator: ["data-[open=true]:rotate-[360deg]"],
        }}
        variant="splitted"
      >
        {DATA_FAQS?.map((item) => {
          return (
            <AccordionItem
              className="mt-2"
              key={item?.id}
              indicator={({ isOpen }) => (isOpen ? <IconMinus /> : <IconPlus />)}
              aria-label="Accordion 1"
              title={
                <Text className="text-white/90" type="font-16-600">
                  {item?.title}
                </Text>
              }
            >
              <Text className="text-white/70" type="font-14-400">
                {item?.content}
              </Text>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
export default Faqs;

const IconPlus = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M9.16666 9.16675V4.16675H10.8333V9.16675H15.8333V10.8334H10.8333V15.8334H9.16666V10.8334H4.16666V9.16675H9.16666Z"
        fill="white"
        fill-opacity="0.9"
      />
      <path
        d="M9.16666 9.66675H9.66666V9.16675V4.66675H10.3333V9.16675V9.66675H10.8333H15.3333V10.3334H10.8333H10.3333V10.8334V15.3334H9.66666V10.8334V10.3334H9.16666H4.66666V9.66675H9.16666Z"
        stroke="white"
        stroke-opacity="0.9"
      />
    </svg>
  );
};

const IconMinus = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15.8333 9.16675H4.16666V10.8334H15.8333V9.16675Z" fill="white" fill-opacity="0.9" />
      <path d="M4.66666 10.3334V9.66675H15.3333V10.3334H4.66666Z" stroke="white" stroke-opacity="0.9" />
    </svg>
  );
};
