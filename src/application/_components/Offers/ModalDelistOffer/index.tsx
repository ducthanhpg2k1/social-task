import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomModal from "@/components/ui/CustomModal";
import Text from "@/components/ui/Text";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import { changeStatusOfferAdmin } from "../serivce";
import { useRequest } from "ahooks";
import { ToastCustom } from "@/components/ui/Toast";
import { IconInfo } from "@/components/ui/icons";
import { EOfferStatus, ERoleUser } from "@/utils/common";
import { useTheme } from "@/hooks/useTheme";

interface IModalDelistOffer {
  reloadList?: VoidFunction;
}

const ModalDelistOffer = (props: IModalDelistOffer, ref?: any) => {
  const { reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [idDelist, setIdDelist] = useState<string>("");

  const { theme } = useTheme();

  const { run: runChangeStatus, loading } = useRequest(changeStatusOfferAdmin, {
    manual: true,
    onSuccess: () => {
      reloadList && reloadList();
      onVisible();
      ToastCustom.success("Offer delisted successfully");
    },
  });

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        setVisible(true);
        setIdDelist(id);
      },
      onClose: () => setVisible(false),
    };
  });
  const onVisible = () => {
    setVisible(!visible);
  };

  const handleChangeStatus = () => {
    const body = {
      status: EOfferStatus?.INACTIVE,
      is_admin: ERoleUser?.ADMIN,
    };
    runChangeStatus(body, idDelist);
  };

  return (
    <CustomModal placementMoblie="center" className="rounded-3xl" size="md" isOpen={visible} onClose={onVisible}>
      <>
        <ModalHeader className="flex flex-col gap-1 p-4 md:p-5">
          <div className="flex items-center justify-center">
            <Image
              src={theme === "light" ? "/images/img-warning.png" : "/images/ic-dark-delist.png"}
              width={100}
              height={100}
              alt="ic-check_circle"
            />
          </div>
        </ModalHeader>
        <ModalBody className="md:px-6 px-4">
          <div className="flex flex-col gap-3 text-center">
            <Text color="text-primary" type="font-24-600">
              Delist Offer
            </Text>
            <Text className="text-secondary" type="body-2-regular">
              Are you sure you want to delist this offer?
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
            <ButtonCustom onClick={handleChangeStatus} isLoading={loading} color="green" size="md" className="w-full">
              Delist
            </ButtonCustom>
          </div>
        </ModalFooter>
      </>
    </CustomModal>
  );
};
export default forwardRef(ModalDelistOffer);
