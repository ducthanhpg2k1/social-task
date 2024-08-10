import { ReactNode } from "react";
import Text from "./Text";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ETypeOffer } from "@/utils/common";

interface IData {
  label: string;
  value: string;
  icon: ReactNode;
  isComingSoon?: boolean;
}
const IconRadioActive = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11.75" cy="11.75" r="9.75" fill="#26BA73" />
      <circle cx="11.75" cy="11.75" r="4" fill="#EEFBF3" />
    </svg>
  );
};
const CardChooseType = ({ data }: { data: IData[] }) => {
  const classDefault = cn(
    "p-4 flex justify-between rounded-2xl border border-neutral-100 cursor-pointer hover:border-brand-500"
  );
  return (
    <div className="gap-3 grid md:grid-cols-2 grid-cols-1">
      <>
        {data?.map((item) => {
          return (
            <div
              key={item?.value}
              className={clsx(classDefault, {
                ["bg-brand-50 !border-brand-500"]: item?.value === ETypeOffer.ON_SELL,
                ["!cursor-not-allowed hover:!border-neutral-100"]: item?.isComingSoon,
              })}
            >
              <div className="flex flex-col gap-4">
                {item?.icon}
                <Text className="text-primary" type="font-16-400">
                  {item?.label}
                </Text>
              </div>
              {!item?.isComingSoon && <IconRadioActive />}
              {item?.isComingSoon && (
                <div className="rounded-full max-h-7 py-1 px-[10px] bg-neutral-50 flex justify-center items-center">
                  <Text className="text-secondary" type="font-12-600">
                    Coming Soon
                  </Text>
                </div>
              )}
            </div>
          );
        })}
      </>
    </div>
  );
};
export default CardChooseType;
