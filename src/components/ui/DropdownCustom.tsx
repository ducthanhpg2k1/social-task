import React, { ReactNode, memo } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Text from "./Text";
import clsx from "clsx";

interface IDropdownProps {
  items: {
    key: string;
    label: string | React.ReactNode;
    icon: ReactNode;
    color?: "default" | "danger" | "primary" | "secondary" | "success" | "warning" | undefined;
  }[];
  title?: string;
  handleClickMenuItem: (key: string) => void;
  children: ReactNode;
  placement?: any;
}
const DropdownCustom = ({ items, handleClickMenuItem, children, placement }: IDropdownProps) => {
  // const selectedValue = useMemo(() => {
  //   const key = Array?.from(selectedKeys)?.join(", ");
  //   const info = items?.find((i) => key === i?.key);
  //   return info?.label;
  // }, [items, selectedKeys]);
  return (
    <Dropdown placement={placement} showArrow className="min-w-[100px]">
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="p-2" selectionMode="single">
        {items.map((item) => {
          return (
            <DropdownItem
              key={item.key}
              onClick={() => handleClickMenuItem(item?.key)}
              color={item?.color}
              className={clsx("data-[hover=true]:bg-neutral-50  data-[selectable=true]:focus:bg-neutral-50 p-2", {
                ["data-[hover=true]:!bg-error-50 [&_svg_path]:text-error-500"]: item?.color === "danger",
                ["data-[hover=true]:!bg-success-50 [&_svg_path]:text-success-500"]: item?.color === "success",
              })}
            >
              <div className="flex items-center gap-2">
                {item?.icon && item?.icon}
                <Text
                  type="font-14-400"
                  className={clsx("text-primary", {
                    ["text-error-500"]: item?.color === "danger",
                    ["text-success-500"]: item?.color === "success",
                  })}
                >
                  {item.label}
                </Text>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(DropdownCustom);
