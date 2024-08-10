import NextLink from "next/link";
import React from "react";
import clsx from "clsx";
import Text from "@/components/ui/Text";
import { useSidebarContext } from "../layout-context";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SiderbarItem = ({ icon, title, isActive, href = "" }: Props) => {
  return (
    <NextLink href={href} className="text-default-900 active:bg-none max-w-full">
      <div
        className={clsx(
          isActive ? "bg-brand-500 [&_svg_path]:!text-white" : "hover:bg-default-100",
          "flex gap-3 w-full [&_svg_path]:text-secondary min-h-[42px] h-full items-center px-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
      >
        {icon}
        <Text type="font-14-400" className={isActive ? "text-white" : "text-secondary"}>
          {title}
        </Text>
      </div>
    </NextLink>
  );
};
