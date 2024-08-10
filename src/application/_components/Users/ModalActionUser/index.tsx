import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomModal from "@/components/ui/CustomModal";
import Text from "@/components/ui/Text";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
// import { changeStatusOfferAdmin } from "../serivce";
import { useRequest } from "ahooks";
import { ToastCustom } from "@/components/ui/Toast";
import { IconInfo } from "@/components/ui/icons";
import { EOfferStatus, ERoleUser, EStatusUser } from "@/utils/common";
import { useTheme } from "@/hooks/useTheme";
import { changeStatusUserAdmin } from "../serivce";

interface IModalActionUser {
  reloadList?: VoidFunction;
}

const ModalActionUser = (props: IModalActionUser, ref?: any) => {
  const { reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [dataAction, setDataAction] = useState<any>({});

  console.log(dataAction, "dataAction");

  const { theme } = useTheme();

  const { run: runChangeStatus, loading } = useRequest(changeStatusUserAdmin, {
    manual: true,
    onSuccess: () => {
      reloadList && reloadList();
      onVisible();
      if (dataAction?.status === EStatusUser?.ACTIVE) {
        ToastCustom.success("Suspend user successfully");
      } else {
        ToastCustom.success("Activate user successfully");
      }
    },
  });

  useImperativeHandle(ref, () => {
    return {
      onOpen: (data: any) => {
        setVisible(true);
        setDataAction(data);
      },
      onClose: () => setVisible(false),
    };
  });
  const onVisible = () => {
    setVisible(!visible);
  };

  const handleChangeStatus = () => {
    const body = {
      status: dataAction?.status === EStatusUser?.ACTIVE ? EStatusUser?.SUSPENDED : EStatusUser?.ACTIVE,
    };
    runChangeStatus(body, dataAction?.id);
  };

  return (
    <CustomModal placementMoblie="center" className="rounded-3xl" size="md" isOpen={visible} onClose={onVisible}>
      <>
        <ModalHeader className="flex flex-col gap-1 p-4 md:p-5">
          <div className="flex items-center justify-center">
            {dataAction?.status === EStatusUser?.SUSPENDED ? (
              <Image
                src={theme === "light" ? "/images/ic-warning-relist.png" : "/images/ic-dark-delist.png"}
                width={100}
                height={100}
                alt="ic-check_circle"
              />
            ) : (
              <Image src={"/icons/ic-suspended.svg"} width={100} height={100} alt="ic-suspended" />
            )}
          </div>
        </ModalHeader>
        <ModalBody className="md:px-6 px-4">
          <div className="flex flex-col gap-3 text-center">
            <Text color="text-primary" type="font-24-600">
              {dataAction?.status === EStatusUser?.SUSPENDED ? "Activate User" : "Suspend User"}
            </Text>
            <Text className="text-secondary" type="body-2-regular">
              {dataAction?.status === EStatusUser?.SUSPENDED
                ? "Are you sure you want to activate this user?"
                : "Are you sure you want to suspend this user?"}
            </Text>
          </div>
        </ModalBody>
        <ModalFooter className="md:p-6 p-4">
          <div className="flex items-center gap-3 w-full">
            <ButtonCustom onClick={onVisible} size="md" className="w-full bg-neutral-50">
              <Text type="font-14-600" color="text-primary">
                Cancel
              </Text>
            </ButtonCustom>
            <ButtonCustom
              onClick={handleChangeStatus}
              isLoading={loading}
              color={dataAction?.status === EStatusUser?.SUSPENDED ? "green" : "danger"}
              size="md"
              className="w-full"
            >
              {dataAction?.status === EStatusUser?.SUSPENDED ? "Activate" : "Suspend"}
            </ButtonCustom>
          </div>
        </ModalFooter>
      </>
    </CustomModal>
  );
};
export default forwardRef(ModalActionUser);
