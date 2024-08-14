import { IconDiscord, IconTelegram, IconX } from "@/components/ui/icons";
import Text from "@/components/ui/Text";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="py-8 flex justify-between items-center">
      <Image src={"/images/logo.png"} alt="logo" className="cursor-pointer w-10 h-8" width={40} height={32} />
      <Text type="font-12-400" className="text-white/50">
        © 2024 All rights reserved. Powered by{" "}
        <Text element="span" className="text-[#A6F]">
          Buzzy.io
        </Text>
      </Text>
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="rounded-full transition-all hover:!bg-[#A6F4] border border-white/5 p-2 flex justify-center items-center">
          <IconX />
        </div>
        <div className="rounded-full border transition-all hover:bg-[#A6F4] border-white/5 p-2 flex justify-center items-center">
          <IconDiscord />
        </div>
        <div className="rounded-full border transition-all hover:bg-[#A6F4] border-white/5 p-2 flex justify-center items-center">
          <IconTelegram />
        </div>
      </div>
    </div>
  );
};
export default Footer;
