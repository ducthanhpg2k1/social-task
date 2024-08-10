import NextLink from "next/link";
import React from "react";
import clsx from "clsx";
import { useSidebarContext } from "./layout-context";
import Text from "@/components/ui/Text";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink href={href} className="text-default-900 active:bg-none max-w-full">
      <div
        className={clsx(
          isActive ? "bg-brand-500 [&_svg_path]:text-white" : "hover:bg-default-100",
          "flex gap-3 w-full [&_svg_path]:text-neutral-600 min-h-[42px] h-full items-center px-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <Text type="font-14-400" className={isActive ? "text-white" : "text-neutral-600"}>
          {title}
        </Text>
      </div>
    </NextLink>
  );
};
