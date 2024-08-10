import Text from "@/components/ui/Text";
import Chip from "@/components/ui/chip";
import { ReactNode } from "react";

const CardPreview = ({ icon, total, title }: { icon: ReactNode; total: number; title: string }) => {
  return (
    <div className="flex bg-background-primary p-6 flex-col gap-4 rounded-3xl">
      <div className="flex items-center justify-between">
        {icon}
        <Chip
          // color={isPositiveNumber ? "success" : "error"}
          color="success"
          text={"15%"}
          // text={isPositiveNumber ? `+${item?.value}%` : `${item?.value}%`}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Text type="font-24-600" className="text-primary">
          {total}
        </Text>
        <Text type="font-14-400" className="text-primary">
          {title}
        </Text>
      </div>
    </div>
  );
};
export default CardPreview;
