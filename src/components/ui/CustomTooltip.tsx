import { Tooltip } from "@nextui-org/react";
import React, { ReactNode } from "react";
import Text from "./Text";

export default function CustomTooltip({
  children,
  text,
  placement,
}: {
  children: React.ReactNode;
  text?: string | ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
}) {
  return (
    <>
      <Tooltip
        showArrow
        placement={placement}
        content={
          <>
            {text || (
              <Text type="font-14-400" className="text-white dark:text-info-950">
                {"Coming Soon"}
              </Text>
            )}
          </>
        }
        classNames={{
          base: "before:bg-neutral-950 ",
          content: "bg-neutral-950 p-2",
        }}
      >
        {children}
      </Tooltip>
    </>
  );
}
