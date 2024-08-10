import Text from "@/components/ui/Text";
import { Info } from "@phosphor-icons/react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import clsx from "clsx";
import { ETypeOffer, TYPE_ASSETS } from "@/utils/common";
ChartJS.register(ArcElement, Tooltip, Legend);

const CardChartTypes = ({
  data,
  options,
  title,
  dataTypes,
}: {
  data: any;
  options?: any;
  title?: string;
  dataTypes?: any;
}) => {
  return (
    <div className="bg-background-primary rounded-3xl p-6 col-start-5 col-span-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Text type="font-20-600" className="text-primary">
            {title}
          </Text>
          <Info size={20} weight="light" className="text-secondary" />
        </div>
        <div className="flex items-center justify-between">
          <Text className="text-secondary" type="font-14-400">
            Secondary text
          </Text>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <Doughnut data={data} options={options} />
        <div className="flex justify-center items-center gap-4 mt-4">
          {dataTypes?.map((item: any) => {
            return (
              <div className="flex items-center gap-2" key={item?.id}>
                <div
                  className={clsx("w-2 h-2 rounded-full", {
                    ["bg-[#26BA73]"]: item?.value === ETypeOffer?.ON_SELL || item?.value === TYPE_ASSETS?.DOMAIN,
                    ["bg-[#F97316]"]: item?.value === ETypeOffer?.AUCTION,
                    ["bg-[#00B1FF]"]: item?.value === TYPE_ASSETS?.TELEGRAM_HANDLE,
                  })}
                />
                <Text className="text-secondary" type="font-14-400">
                  {item?.label}
                </Text>
              </div>
            );
          })}
          {/*           
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#F97316] rounded-full" />
            <Text className="text-neutral-600" type="font-14-400">
              On Auction
            </Text>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default CardChartTypes;
