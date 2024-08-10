import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomModal from "@/components/ui/CustomModal";
import Text from "@/components/ui/Text";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useRequest } from "ahooks";
import { ToastCustom } from "@/components/ui/Toast";
import { EOrderStatus } from "@/utils/common";

interface IModalCancelOfferTicket {
  reloadList?: VoidFunction;
}

const ModalCancelOfferTicket = (props: IModalCancelOfferTicket, ref?: any) => {
  const { reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");
  // const { run: runCancelOffer, loading } = useRequest(cancelOrderAdmin, {
  //   manual: true,
  //   onSuccess: () => {
  //     onVisible();
  //     ToastCustom.success("Cancel order successfully");
  //     reloadList && reloadList();
  //   },
  // });

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        setVisible(true);
        setIdDelete(id);
      },
      onClose: () => setVisible(false),
    };
  });
  const onVisible = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    const body = {
      status: EOrderStatus.FORCE_CANCEL,
    };
    // runCancelOffer(body, idDelete);
  };

  return (
    <CustomModal placementMoblie="center" className="rounded-3xl" size="md" isOpen={visible} onClose={onVisible}>
      <>
        <ModalHeader className="flex flex-col gap-1 p-4 md:p-5">
          <div className="flex items-center justify-center">
            <Image src="/images/img-warning.png" width={100} height={100} alt="ic-check_circle" />
          </div>
        </ModalHeader>
        <ModalBody className="py-2 md:px-6 px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 text-center">
              <Text color="text-primary" type="font-24-600">
                Cancel Offer
              </Text>
              <Text className="text-secondary" type="body-2-regular">
                Are you sure you want to cancel this offer?
              </Text>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="md:p-6 p-4">
          <div className="flex items-center gap-3 w-full">
            <ButtonCustom
              onClick={() => {
                onVisible();
              }}
              size="md"
              className="w-full bg-neutral-50"
            >
              <Text type="font-14-600" color="text-primary">
                Cancel
              </Text>
            </ButtonCustom>
            <ButtonCustom
              // isDisabled={loading}
              onClick={handleCancel}
              color="green"
              // isLoading={loading}
              size="md"
              className="w-full"
            >
              Confirm
            </ButtonCustom>
          </div>
        </ModalFooter>
      </>
    </CustomModal>
  );
};
export default forwardRef(ModalCancelOfferTicket);
