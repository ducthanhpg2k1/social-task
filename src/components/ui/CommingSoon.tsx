import React from "react";
import Text from "./Text";
import { Info } from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import clsx from "clsx";

interface ICommingSoomProps {
  textComingSoon?: string | undefined;
  className?: string;
}

const ComingSoon = (props: ICommingSoomProps) => {
  const { textComingSoon, className = "" } = props;
  return (
    <>
      <div
        className={clsx("px-[8px] py-[4px] md:flex items-center rounded-[1000px] bg-neutral-50 hidden", {
          [className]: className,
        })}
      >
        <Text type="font-12-600" className="text-secondary">
          {textComingSoon || "Comming Soon"}
        </Text>
      </div>
      <Popover
        showArrow={true}
        placement="top"
        classNames={{
          base: [
            // arrow color
            "before:bg-neutral-950",
          ],
          content: "bg-neutral-950 p-2 rounded-full",
        }}
      >
        <PopoverTrigger>
          <Info size={20} className="block md:hidden" />
        </PopoverTrigger>
        <PopoverContent>
          <Text type="font-12-600" className="text-white">
            Comming Soon
          </Text>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ComingSoon;
