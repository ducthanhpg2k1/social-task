import Text from "@/components/ui/Text";
import Image from "next/image";

const NoDataTable = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-6 min-h-[300px]">
      <Image src={"/images/empty-offer.png"} width={120} height={90} alt="logo" />
      <Text type="font-16-400" className="text-secondary">
        {text}
      </Text>
    </div>
  );
};

export default NoDataTable;
