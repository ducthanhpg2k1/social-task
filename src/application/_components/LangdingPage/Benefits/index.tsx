import Text from "@/components/ui/Text";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const DATA_BENEFITS = [
  {
    id: 1,
    title: "For Advertisers",
    description:
      "Maximize engagement and reach with precision targeting and real-time analytics, enhancing your campaigns across the web3 community.",
    urlImg: "/images/homepage/img-content-creation.png",
  },
  {
    id: 2,
    title: "For Publishers",
    description:
      "Monetize your app through diverse, engaging social tasks, driving increased traffic and deepening audience connections.",
    urlImg: "/images/homepage/img-ad-revenue.png",
  },
];

const Benefits = () => {
  return (
    <div className="flex flex-col gap-8 pt-10">
      <div className="flex justify-center items-center text-center flex-col gap-4">
        <Button className="bg-white/5 border border-white/10 py-2 px-4 max-h-8">
          <Text className="font-medium text-xs text-[#A6F]">BENEFITS</Text>
        </Button>
        <Text className="font-semibold text-4xl text-white w-[500px]">Unlock Your Community Potential with Buzzy</Text>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {DATA_BENEFITS?.map((item) => {
          return (
            <div
              key={item?.id}
              className="flex bg-[#FFFFFF03] border text-center border-white/5 py-16 px-[128px] rounded-2xl items-center justify-center flex-col gap-4"
            >
              <Image src={item?.urlImg} alt="" className="w-[160x] h-[160px]" width={160} height={160} />
              <Text className="text-white/90" type="font-24-600">
                {item?.title}
              </Text>
              <Text className="text-white/50" type="font-16-400">
                {item?.description}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Benefits;
