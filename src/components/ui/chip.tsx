import { cn } from "@/lib/utils";
import Text from "./Text";
import clsx from "clsx";
import { EOfferStatus, EOrderStatus, EReportStatus, EStatusUser } from "@/utils/common";

interface IChipProps {
  text: string | number;
  status?: any;
  color?: "success" | "error";
}
const Chip = (props: IChipProps) => {
  const { text, status, color } = props;
  const classDefault = cn("rounded-full w-max max-h-[28px] py-1 px-3 flex items-center justify-center");
  return (
    <div
      className={clsx(classDefault, {
        ["bg-warning-50 border border-warning-300 text-warning-500"]: [
          EOfferStatus?.FILLED,
          EOfferStatus?.WAITING_FOR_BUYER_CLAIM,
          EOrderStatus?.WAITING_FOR_TRANSFER,
          EOrderStatus.RECEIVED_CODE,
        ].includes(status),
        ["bg-success-50 text-success-500 border border-success-300"]:
          status === EOfferStatus?.SELL_COMPLETED ||
          status === EOrderStatus?.PURCHASE_COMPLETED ||
          status === EReportStatus?.RESOLVED ||
          color === "success",
        ["bg-error-50 text-error-500 border border-error-300"]:
          status === EOrderStatus.TRANSFER_ERROR ||
          status === EOfferStatus?.SETTLED ||
          status === EOfferStatus?.INACTIVE ||
          status === EOrderStatus?.FORCE_CANCEL ||
          color === "error",
        ["bg-info-50 text-info-500 border border-info-300"]:
          status === EOfferStatus?.ACTIVE || status === EReportStatus?.IN_PROGRESS,
        // ["bg-neutral-50 text-secondary border border-neutral-500"]: status === EOfferStatus?.INACTIVE,
      })}
    >
      <Text type="font-12-600">{text}</Text>
    </div>
  );
};
export default Chip;
