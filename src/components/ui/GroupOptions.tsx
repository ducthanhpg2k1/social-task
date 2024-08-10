import { ButtonCustom } from "./ButtonCustom";
import Text from "./Text";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { Circle, RadioButton } from "@phosphor-icons/react";
import CustomTooltip from "./CustomTooltip";
import { TYPE_ASSETS } from "@/utils/common";

interface IDataOptions {
  value: string;
  label: string;
}

const GroupOptions = ({
  data,
  onChangeRadio,
  valueRadio,
}: {
  valueRadio: string;
  data: IDataOptions[];
  onChangeRadio: (value: string) => void;
}) => {
  const classDefault = cn("flex-1 bg-neutral-50 rounded-full justify-start !pl-3 py-2 pl-1");
  return (
    <div className="flex items-center gap-3 w-full">
      {data?.map((item) => {
        return (
          <>
            {item?.value !== TYPE_ASSETS?.DOMAIN ? (
              <CustomTooltip key={item?.value}>
                <ButtonCustom
                  className={clsx(classDefault, {
                    ["bg-brand-500"]: item?.value === valueRadio,
                  })}
                  size="md"
                >
                  {item?.value === valueRadio ? (
                    <RadioButton size={20} color="white" weight="fill" />
                  ) : (
                    <Circle size={20} color="#322929" />
                  )}
                  <Text
                    type={item?.value === valueRadio ? "font-14-600" : "font-14-600"}
                    className={item?.value === valueRadio ? "text-white" : "text-primary"}
                  >
                    {item?.label}
                  </Text>
                </ButtonCustom>
              </CustomTooltip>
            ) : (
              <ButtonCustom
                // onClick={() => {
                //   item?.value === TYPE_ASSETS?.DOMAIN && onChangeRadio(item?.value);
                // }}
                // isDisabled={item?.value !== TYPE_ASSETS?.DOMAIN}
                className={clsx(classDefault, {
                  ["bg-brand-500"]: item?.value === valueRadio,
                })}
                size="md"
              >
                {item?.value === valueRadio ? (
                  <RadioButton size={20} color="white" weight="fill" />
                ) : (
                  <Circle size={20} color="#322929" />
                )}
                <Text
                  type={item?.value === valueRadio ? "font-14-600" : "font-14-600"}
                  className={item?.value === valueRadio ? "text-white" : "text-primary"}
                >
                  {item?.label}
                </Text>
              </ButtonCustom>
            )}
          </>
        );
      })}
    </div>
  );
};
export default GroupOptions;
