import { IconMessageChat } from "@/components/ui/icons";
import Text from "@/components/ui/Text";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const MENUS = [
  {
    title: "Home",
    id: "#home",
  },
  {
    title: "How It Works",
    id: "#its-works",
  },
  {
    title: "Benefits",
    id: "#benefits",
  },
  {
    title: "Testimonials",
    id: "#testimonials",
  },
  {
    title: "FAQs",
    id: "#fAQs",
  },
];

const HeaderHome = () => {
  return (
    <div className="w-8/12 m-auto flex justify-between py-6 px-0 border-b border-b-white/5">
      <Image src={"/images/logo.png"} alt="logo" className="cursor-pointer w-10 h-8" width={40} height={32} />
      <MenuHeader />
      <Button className="bg-transparent border-2 border-white/10 px-4 py-3 min-h-12">
        <IconMessageChat />
        <Text className="text-[#A6F]" type="font-14-600">
          Talk to an expert
        </Text>
      </Button>
    </div>
  );
};
export default HeaderHome;

const MenuHeader = () => {
  return (
    <div className="flex items-center gap-8">
      {MENUS?.map((item) => {
        return (
          <div key={item?.id} id={item?.id} className="cursor-pointer relative">
            <Text type="font-14-600" className="text-white/80 transition-all hover:text-white">
              {item?.title}
            </Text>
            <div />
          </div>
        );
      })}
    </div>
  );
};
