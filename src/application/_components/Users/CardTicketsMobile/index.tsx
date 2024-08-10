import { ButtonCustom } from "@/components/ui/ButtonCustom";
import Text from "@/components/ui/Text";
import Chip from "@/components/ui/chip";
import { capitalized, renderTextStatusOffer, renderTextStatusOrder } from "@/utils/common";
import dayjs from "dayjs";
import Image from "next/image";

const CardTicketsMobile = ({ item, formatPriceInUsd }: { item: any; formatPriceInUsd?: any }) => {
  return (
    <div key={item?.id} className="p-4 flex flex-col gap-3 rounded-3xl bg-neutral-50 w-full">
      <div className="flex flex-col gap-3 border-b border-b-neutral-100">
        <div className="flex items-center justify-between">
          <Image width={24} height={24} alt="ic-ai" src={"/icons/icAI.svg"} />
          {/* <Image width={24} height={24} alt="ic-io" src={"/icons/ic-io.svg"} /> */}
          <Chip text={renderTextStatusOrder(item?.status)} status={item?.status} />
        </div>
        <Text className="primary mb-3" type="font-16-600">
          {item?.asset?.assets_name || "-"}
        </Text>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Text className="text-secondary" type="font-14-400">
            Type
          </Text>
          <Text className="text-primary" type="font-14-400">
            {item?.asset?.assets_type ? capitalized(item?.asset?.assets_type) : "-"}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Text className="text-secondary" type="font-14-400">
            Sale Price
          </Text>
          <div className="flex items-center gap-2">
            <Image
              alt="ic-solana"
              width={20}
              className="w-5 md:w-5 aspect-square"
              height={20}
              src={"/images/ic-toncoi-logo.png"}
            />
            <Text className="text-primary" type="font-14-600">
              {item?.price || "-"}
            </Text>

            <div className="h-4 w-[1px] bg-neutral-200" />
            <Text className="text-secondary" type="font-12-400">
              {`~$${formatPriceInUsd(item?.price)}`}
            </Text>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Text className="text-secondary" type="font-14-400">
            Purchase Date
          </Text>
          <div className="flex items-center gap-2">
            <Text className="text-primary" type="font-14-400">
              {item?.order_wallet?.created_at ? dayjs(item?.order_wallet?.created_at).format("DD MMM YYYY") : "-"}
            </Text>
            <div className="h-4 w-[1px] bg-neutral-200" />
            <Text className="text-secondary" type="font-12-400">
              {dayjs(item?.order_wallet?.created_at).format("h:mm A")}
            </Text>
          </div>
        </div>
        <ButtonCustom className="rounded-full w-full p-2" size="md" color="green">
          Get code
        </ButtonCustom>
      </div>
    </div>
  );
};
export default CardTicketsMobile;
