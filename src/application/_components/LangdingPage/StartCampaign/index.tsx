"use client";
import Text from "@/components/ui/Text";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const StartCampaign = () => {
  return (
    <div className="grid grid-cols-7 gap-32 w-full">
      <div className="flex justify-center items-center flex-col gap-16 w-full col-span-3">
        <div className="flex flex-col gap-4">
          <Text className="text-[50px] font-semibold leading-[56px] text-white">Web3 Social Tasks</Text>
          <Text className="text-[18px] font-normal leading-[28px] text-white/70">
            Dive into the future of engagement with Buzzy, your premier partner in web3 marketing. Harness the power of
            social tasks to connect, engage, and succeed in the digital realm.
          </Text>
        </div>
        <div className="items-center gap-4 grid grid-cols-2 w-full">
          <Button className="py-4 px-6 bg-[#A6F] rounded-lg w-full min-h-14">
            <Text className="text-base font-semibold text-white">Start Your Campaign</Text>
          </Button>
          <Button className="py-4 px-6 bg-white/5 rounded-lg w-full min-h-14">
            <Text className="text-base font-semibold text-white">Monetize Your Traffic</Text>
          </Button>
        </div>
      </div>
      <div className="col-span-4">
        <Image
          src={"/images/bg-start-campaign.png"}
          alt=""
          width={640}
          height={480}
          className="w-full h-auto object-cove"
        />
      </div>
    </div>
  );
};
export default StartCampaign;
