import { Chip } from "@nextui-org/react";
import clsx from "clsx";
import Text from "./Text";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
type TTypeChip = "error" | "warning" | "success" | "processing" | "success-sm";
const CustomChip = (props: { type: TTypeChip; title: string; className?: string }) => {
  const { type, title, className = "" } = props;

  const classNameWithType = useMemo(() => {
    switch (type) {
      case "success":
        return "border-1 solid border-brand-300 bg-brand-50 rounded-[1000px]";
      case "warning":
        return "border-1 solid border-warning-300 bg-warning-50 rounded-[1000px]";
      case "error":
        return "border-1 solid border-error-300 bg-error-50 rounded-[1000px]";
      case "processing":
        return "border-1 solid border-info-300 bg-info-50 rounded-[1000px]";
      case "success-sm":
        return "bg-brand-50 rounded-[1000px] pr-[10px] pl-[10px]";
      default:
        return "border-1 solid border-brand-300 bg-brand-50 rounded-[1000px]";
    }
  }, [type]);

  const classNameTextWithType = useMemo(() => {
    switch (type) {
      case "success":
        return "text-brand-500";
      case "warning":
        return "text-warning-500";
      case "error":
        return "text-error-500";
      case "processing":
        return "text-info-500";
      default:
        return "text-brand-500";
    }
  }, [type]);
  const classDefault = cn("flex items-center justify-center p-1 ");
  return (
    <Chip className={clsx("w-fit", classDefault, classNameWithType, { [className]: !!className })}>
      {
        <Text type="font-12-600" className={clsx(classNameTextWithType)}>
          {title}
        </Text>
      }
    </Chip>
  );
};

export default CustomChip;
