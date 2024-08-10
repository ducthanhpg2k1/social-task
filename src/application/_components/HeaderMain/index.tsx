import Text from "@/components/ui/Text";
import { ToastCustom } from "@/components/ui/Toast";
import useAccessToken from "@/hooks/useAccesToken";
import { atomProfile } from "@/store/profile.store";
import { ROUTE_PATH } from "@/utils/route";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { SignOut } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ReactNode } from "react";

enum EDropDownKeys {
  LOGOUT = "LOGOUT",
}

const HeaderMain = ({ title, suffix }: { title?: string; suffix?: ReactNode }) => {
  const router = useRouter();
  const { removeAccessToken } = useAccessToken();
  const [, setProfile] = useAtom(atomProfile);

  const onClickMenu = (selectedKeys: any) => {
    const key = Array.from(selectedKeys).join(", ").replaceAll("_", " ");
    console.log("key", key);

    if (key === EDropDownKeys.LOGOUT) {
      removeAccessToken();
      router.push(ROUTE_PATH.SIGN_IN);
      ToastCustom.success("Disconected wallet successfully");
      setProfile(undefined);
    }
  };
  return (
    <div className="flex justify-between items-center w-full">
      {/* <Text type="font-32-600" className="text-primary">
        {title}
      </Text> */}
      <>{suffix}</>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar size="sm" className="cursor-pointer" src="/icons/avatar-seller.svg" />
        </DropdownTrigger>

        <DropdownMenu aria-label="Static Actions" onSelectionChange={onClickMenu} selectionMode="single">
          <DropdownItem className="data-[hover=true]:bg-neutral-50 p-2" key={EDropDownKeys.LOGOUT}>
            <div className="flex items-center gap-2">
              <SignOut className="text-secondary" size={20} />
              <Text type="font-14-400" className="text-secondary hover:primary">
                Logout
              </Text>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default HeaderMain;
