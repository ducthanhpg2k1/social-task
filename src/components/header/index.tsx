import useAccessToken from "@/hooks/useAccesToken";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/hooks/useTheme";
import { ROUTE_PATH } from "@/utils/route";
import { shortenAddress } from "@/utils/wallet.helper";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { CaretDown, Moon, SignOut, Sun, UserCircle } from "@phosphor-icons/react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { ButtonCustom } from "../ui/ButtonCustom";
import CustomTooltip from "../ui/CustomTooltip";
import Text from "../ui/Text";
import { ToastCustom } from "../ui/Toast";
import { IconMenu, IconTonWallet } from "../ui/icons";

const DATA_MENUS = [
  {
    href: ROUTE_PATH.HOME,
    title: "Domains",
  },
  {
    href: ROUTE_PATH.PHONE_NUMBER,
    title: "Sticker",
    disabled: true,
  },
  {
    href: ROUTE_PATH.TELEGRAM_HANDLE,
    title: "Telegram Handles",
    disabled: true,
  },
];
const DashboardHeader = () => {
  const router = useRouter();
  const [tonConnectUi] = useTonConnectUI();
  const address = useTonAddress();
  const { removeAccessToken } = useAccessToken();
  const { theme, onSwitchTheme } = useTheme();
  const { setProfile } = useProfile();

  const handleDisconect = async () => {
    removeAccessToken();
    const res = await tonConnectUi.disconnect();

    console.log(res, "res");

    ToastCustom.success("Disconected wallet successfully");
    setProfile(undefined);
  };

  return (
    <div className="w-full">
      <div className="w-full container min-h-[72px] flex items-center justify-between flex-wrap cursor-pointer">
        <div className="flex  gap-14">
          <div
            className="flex gap-3 h-16 items-center"
            onClick={() => {
              if (router.pathname === ROUTE_PATH.HOME) {
                router?.reload();
              } else {
                router.push(ROUTE_PATH.HOME);
              }
            }}
          >
            <Image
              alt="escrow_market_logo_dark"
              width={130}
              height={36}
              className="w-[130px] h-9 aspect-square"
              src={theme === "light" ? "/icons/ic-light-logo.svg" : "/icons/ic-dark-logo.svg"}
            />
          </div>
          <div className="hidden lg:flex  gap-10 ">
            {DATA_MENUS.map((item) => {
              const active = router.pathname === item.href;
              const activeClass =
                "before:block before:absolute relative before:h-1 before:w-full before:bg-brand-500 before:bottom-[-4px] before:rounded-t-2xl";
              return (
                <div
                  key={item.href}
                  onClick={() => !item.disabled && router.push(item.href)}
                  className={clsx("relative h-full flex items-center justify-center", { [activeClass]: active })}
                >
                  {item.disabled ? (
                    <CustomTooltip>
                      <div
                        onClick={() => !item.disabled && router.push(item.href)}
                        className={clsx("relative h-full flex items-center justify-center", { [activeClass]: active })}
                      >
                        <Text type="font-14-600" className={clsx("text-secondary", { ["text-primary"]: active })}>
                          {item.title}
                        </Text>
                      </div>
                    </CustomTooltip>
                  ) : (
                    <Text type="font-14-600" className={clsx("text-secondary", { ["text-primary"]: active })}>
                      {item.title}
                    </Text>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[40px] h-[40px] rounded-full bg-neutral-50 flex items-center justify-center lg:hidden">
          <IconMenu color={theme === "dark" ? "#ffffff" : "#002740"} />
        </div>

        <div className="flex-row gap-2 hidden lg:flex">
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center gap-2">
            {!address && (
              // <TonConnectButton className="ton-custom" />
              <ButtonCustom
                className="rounded-full w-10 aspect-square min-w-0 md:min-w-[172px] p-2"
                size="md"
                onClick={() => tonConnectUi.openModal()}
                color="green"
              >
                <IconTonWallet />
                <Text className="hidden md:block">Connect wallet</Text>
              </ButtonCustom>
            )}

            {address && (
              <Dropdown>
                <DropdownTrigger>
                  {/* <div className="flex items-center gap-2 cursor-pointer"> */}
                  <ButtonCustom className="bg-neutral-50 rounded-full md:min-w-[172px] py-2 px-4" size="md">
                    <IconTonWallet />

                    <Text type="font-14-600" color="text-primary">
                      {address && shortenAddress(address)}
                    </Text>
                    <CaretDown className="text-primary" size={20} />
                  </ButtonCustom>
                  {/* </div> */}
                </DropdownTrigger>

                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    onClick={() => {
                      router.push(ROUTE_PATH.MY_PROFILE);
                    }}
                    className="data-[hover=true]:bg-neutral-50 p-2"
                    key={ROUTE_PATH.MY_PROFILE}
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle className="text-secondary" size={20} />
                      <Text type="font-14-400" className="text-secondary hover:primary">
                        My Profile
                      </Text>
                    </div>
                  </DropdownItem>
                  {/* <DropdownItem
                    onClick={() => {
                      router.push(ROUTE_PATH.MY_PURCHASE);
                    }}
                    className="data-[hover=true]:bg-neutral-50"
                    key="new"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="text-secondary" size={20} />
                      <Text type="font-14-400" className="text-secondary hover:primary">
                        My Purchases
                      </Text>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push(ROUTE_PATH.MY_ASSETS);
                    }}
                    className="data-[hover=true]:bg-neutral-50"
                    key="new"
                  >
                    <div className="flex items-center gap-2">
                      <SquaresFour className="text-secondary" size={20} />

                      <Text type="font-14-400" className="text-secondary hover:primary">
                        My Offers
                      </Text>
                    </div>
                  </DropdownItem> */}

                  <DropdownItem
                    onClick={() => handleDisconect()}
                    className="data-[hover=true]:bg-neutral-50 p-2"
                    key="new"
                  >
                    <div className="flex items-center gap-2">
                      <SignOut className="text-secondary" size={20} />
                      <Text type="font-14-400" className="text-secondary hover:primary">
                        Disconect Wallet
                      </Text>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
            <div className="border-1 border-solid border-neutral-200 h-4 mx-2"></div>
            <div
              className="p-2 flex items-center justify-center bg-neutral-50 rounded-full hover:bg-neutral-100"
              onClick={() => onSwitchTheme()}
            >
              {theme === "light" ? (
                <Sun size={20} className="text-primary" />
              ) : (
                <Moon size={20} className="text-primary" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
