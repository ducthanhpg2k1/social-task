import React, { memo, useMemo } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Image from "next/image";
import Text from "./Text";
import { cn } from "@/lib/utils";
import { Placeholder } from "@phosphor-icons/react";

type OverlayPlacement =
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

interface IDropdownProps {
  items: { key: string; label: string | React.ReactNode }[];
  title?: string;
  selectedKeys?: string[];
  setSelectedKeys: any;
  prefixLabel?: string;
  placement?: OverlayPlacement;
  placeholder?: string;
}
const DropDown = ({ items, selectedKeys, setSelectedKeys, prefixLabel, placement, placeholder }: IDropdownProps) => {
  const selectedValue = useMemo(() => {
    const info = items?.find((i) => selectedKeys?.includes(i?.key));
    return info?.label;
  }, [items, selectedKeys]);

  return (
    <Dropdown placement={placement}>
      <DropdownTrigger>
        <Button
          className={cn(
            "border-1 !py-3 !px-4 w-max border-solid border-neutral-100 flex align-middle justify-center gap-2 bg-background-primary rounded-full"
          )}
        >
          {!selectedValue ? (
            <Text type="font-14-600" className={cn("text-primary")}>
              {prefixLabel ? `${prefixLabel}: ${placeholder}` : placeholder}
            </Text>
          ) : (
            <Text type="font-14-600" className={cn("text-primary")}>
              {prefixLabel ? `${prefixLabel}: ${selectedValue}` : selectedValue}
            </Text>
          )}

          <Image src={"/icons/ic-arrow-down.svg"} alt="ic-arrow-down" width={16} height={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="p-2"
        selectionMode="single"
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
      >
        {items.map((item) => {
          return (
            <DropdownItem
              key={item.key}
              className="data-[hover=true]:bg-neutral-50 data-[selectable=true]:focus:bg-neutral-50 p-2"
            >
              <Text type="font-14-400" className="text-secondary hover:primary">
                {item.label}
              </Text>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(DropDown);
