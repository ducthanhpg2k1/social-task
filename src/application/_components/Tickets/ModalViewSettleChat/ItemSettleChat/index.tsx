import Text from "@/components/ui/Text";
import { ReactNode } from "react";

const ItemSettleChat = ({ label, suffix }: { label: string; suffix: ReactNode }) => {
  return (
    <div className="flex flex-col gap-1">
      <Text type="font-14-400" className="text-neutral-600">
        {label}
      </Text>
      {suffix}
    </div>
  );
};
export default ItemSettleChat;
