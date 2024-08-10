import { tv } from "@nextui-org/react";

export const SidebarWrapper = tv({
  base: "bg-background-primary transition-transform h-full fixed -translate-x-full w-[200px] shrink-0 z-[202] overflow-y-auto flex-col pt-6 pb-4 px-4 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ",

  variants: {
    collapsed: {
      true: "translate-x-0 ml-0 [display:inherit]",
    },
  },
});
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100",
});

export const Header = tv({
  base: "flex gap-8 items-center relative",
});

export const Body = tv({
  base: "flex flex-col gap-6",
});

export const Footer = tv({
  base: "flex flex-col gap-2 pt-16 pb-8 md:pt-10 md:pb-0",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
