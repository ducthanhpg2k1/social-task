import Text from "@/components/ui/Text";
import { EOfferStatus, EReportStatus, EStatusUser } from "@/utils/common";
import { Info } from "@phosphor-icons/react";
import clsx from "clsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CardChart = ({
  data,
  options,
  title,
  typeStatus,
  dataStatus,
}: {
  data: any;
  options?: any;
  title?: string;
  dataStatus?: any;
  typeStatus?: "circle" | null;
}) => {
  return (
    <div className="rounded-3xl bg-background-primary p-6 flex flex-col gap-6 col-start-1 col-span-4">
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
          <div className="flex items-center gap-4">
            {dataStatus?.map((item: any) => {
              return (
                <div key={item?.id} className="flex items-center gap-2">
                  {typeStatus === "circle" ? (
                    <div
                      className={clsx("w-2 h-2 rounded-full", {
                        ["bg-brand-500"]:
                          item?.status === EStatusUser?.ACTIVE || item?.status === EReportStatus?.RESOLVED,
                        ["bg-error-500"]: item?.status === EStatusUser?.SUSPENDED,
                        ["bg-info-500"]: item?.status === EReportStatus?.IN_PROGRESS,
                      })}
                    />
                  ) : (
                    <div
                      className={
                        item?.status === EOfferStatus?.INACTIVE
                          ? `w-2 h-[2px] bg-neutral-500`
                          : `w-2 h-[2px] bg-${item?.color}`
                      }
                    />
                  )}

                  <Text type="font-14-400" className="text-secondary">
                    {item?.label}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};
export default CardChart;
