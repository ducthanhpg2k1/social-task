"use client";

import React, { useEffect, useState } from "react";
import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar.styles";
import { Settings, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { useSidebarContext } from "./layout-context";
import { CaretLeft, House, Moon, Note, SignOut, Tag, Ticket, User } from "@phosphor-icons/react";
import { ROUTE_PATH } from "@/utils/route";
import { SiderbarItem } from "./SiderbarItem";
import { ButtonCustom } from "@/components/ui/ButtonCustom";
import Text from "@/components/ui/Text";

const Siderbar = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { theme, onSwitchTheme } = useTheme();
  const [selected, setSelectedTab] = useState<string>("light");

  const MENUS = [
    {
      id: 1,
      title: "Dashboard",
      icon: <House size={20} />,
      link: ROUTE_PATH.DASHBOARD,
    },
    {
      id: 2,
      title: "Tickets",
      icon: <Ticket size={20} />,
      link: ROUTE_PATH?.TICKETS,
    },
    {
      id: 3,
      title: "Users",
      icon: <User size={20} />,
      link: ROUTE_PATH.USERS,
    },
    {
      id: 4,
      title: "Offers",
      icon: <Tag size={20} />,
      link: ROUTE_PATH.OFFERS,
    },
    {
      id: 5,
      title: "Orders",
      icon: <Note size={20} />,
      link: ROUTE_PATH.ORDERS,
    },
  ];

  useEffect(() => {
    setSelectedTab(theme);
  }, [theme]);

  const onSelected = (tab: any) => {
    setSelectedTab(tab);
    onSwitchTheme();
  };

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}

      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Image
            alt="escrow_market_logo_dark"
            width={130}
            height={36}
            className="w-[130px] h-9 aspect-square"
            src={theme === "light" ? "/icons/ic-light-logo.svg" : "/icons/ic-dark-logo.svg"}
          />
          {/* <ButtonCustom isIconOnly className="bg-white absolute right-[-30px] z-[1000]" radius="full">
            <CaretLeft size={16} />
          </ButtonCustom> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3 mt-8">
            {MENUS?.map((item) => {
              return (
                <div key={item?.id} className={Sidebar.Body()}>
                  <SiderbarItem
                    title={item?.title}
                    icon={item?.icon}
                    isActive={pathname === item?.link}
                    href={item?.link}
                  />
                </div>
              );
            })}
          </div>

          <div className={Sidebar.Footer()}>
            <Tabs
              radius={"full"}
              aria-label="Tabs radius"
              onSelectionChange={onSelected}
              selectedKey={selected}
              classNames={{
                tabList: "bg-neutral-50 p-1 gap-0 w-full",
                cursor: "shadow-none",
                tab: "p-2 h-auto",
                tabContent: "rounded-full transition-all ",
              }}
            >
              <Tab
                className={selected === "light" ? "bg-background-primary" : "bg-inherit"}
                key={"light"}
                title={<Sun size={20} className="text-primary" />}
              />
              <Tab key={"dark"} title={<Moon size={20} className="text-primary" />} />
            </Tabs>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Siderbar;
