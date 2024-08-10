/* eslint-disable react-hooks/exhaustive-deps */

import { forwardRef, useImperativeHandle, useState } from "react";

import CustomModal from "@/components/ui/CustomModal";
import Text from "@/components/ui/Text";
import { useProfile } from "@/hooks/useProfile";
import { API_PATH } from "@/utils/api.utils";
import makeAxiosRequest from "@/utils/makeAxiosRequest";
import { ModalBody, ModalHeader } from "@nextui-org/react";
import { X } from "@phosphor-icons/react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRequest } from "ahooks";
import TelegramLoginButton from "../header/TelegramLoginButton/TelegramLoginButton";
import { ToastCustom } from "./Toast";

const serviceRegisterTelegram = (data: { address: string; telegram_id: string; username: string }) => {
  return makeAxiosRequest({
    method: "POST",
    body: JSON.stringify(data),
    path: API_PATH.REGISTER_TELEGRAM,
  });
};

const ModalConnectTelegram = ({ onSubmit }: any, ref?: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const wallet = useTonWallet();
  const { setProfile } = useProfile();
  const { runAsync } = useRequest(serviceRegisterTelegram, { manual: true });
  const onVisible = () => {
    setVisible(!visible);
  };
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => setVisible(false);
  useImperativeHandle(ref, () => {
    return {
      onOpen,
      onClose,
    };
  });

  const onAuthTelegram = async (e: any) => {
    if (!wallet) return;
    const payload = {
      address: wallet.account.address,
      telegram_id: String(e?.id),
      username: e?.username,
    };
    const res = await runAsync(payload);
    if (!!res.status) {
      onSubmit && onSubmit();
      setProfile(res.data);
    } else {
      ToastCustom.error("The system error");
    }
    onVisible();
  };

  return (
    <>
      <CustomModal placementMoblie="bottom" className="rounded-3xl" size="md" isOpen={visible} onClose={onVisible}>
        <ModalHeader className="flex flex-col gap-1 px-5 pt-5 pb-0">
          <div className="flex items-center justify-center relative">
            <Text color="text-primary" type="font-24-600">
              Connect Telegram
            </Text>
            <div
              onClick={onVisible}
              className="cursor-pointer absolute right-0 w-[40px] h-[40px] flex justify-center items-center rounded-full bg-neutral-50"
            >
              <X className="text-secondary" size={20} />
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="pb-6 pt-2 px-6 flex justify-center w-full">
          <TelegramLoginButton
            botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "escrow_m_bot"}
            dataOnAuth={(e: any) => onAuthTelegram(e)}
          />
        </ModalBody>
      </CustomModal>
    </>
  );
};
export default forwardRef(ModalConnectTelegram);
