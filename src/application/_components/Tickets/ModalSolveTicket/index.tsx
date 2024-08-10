import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomModal from "@/components/ui/CustomModal";
import Text from "@/components/ui/Text";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useRequest } from "ahooks";
import { ToastCustom } from "@/components/ui/Toast";
import { updateStatusReport } from "../serivce";
import { EReportStatus } from "@/utils/common";

interface IModalSolveTicket {
  reloadList?: VoidFunction;
}

const ModalSolveTicket = (props: IModalSolveTicket, ref?: any) => {
  const { reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [idReport, setIdReport] = useState("");
  const { theme } = useTheme();

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        setVisible(true);
        setIdReport(id);
      },
      onClose: () => setVisible(false),
    };
  });
  const { run: runUpdateStatusReport, loading } = useRequest(updateStatusReport, {
    manual: true,
    onSuccess: () => {
      onVisible();
      ToastCustom.success("Solve ticket successfully");
      reloadList && reloadList();
    },
  });

  const handleSolve = () => {
    const body = {
      status: EReportStatus?.RESOLVED,
    };
    runUpdateStatusReport(body, idReport);
  };

  const onVisible = () => {
    setVisible(!visible);
  };

  return (
    <CustomModal placementMoblie="center" className="rounded-3xl" size="md" isOpen={visible} onClose={onVisible}>
      <>
        <ModalHeader className="flex flex-col gap-1 p-4 md:p-5">
          <div className="flex items-center justify-center">
            <Image
              src={theme === "light" ? "/images/ic-warning-relist.png" : "/images/ic-dark-delist.png"}
              width={100}
              height={100}
              alt="ic-check_circle"
            />
          </div>
        </ModalHeader>
        <ModalBody className="md:px-6 px-4">
          <div className="flex flex-col gap-3 text-center">
            <Text color="text-primary" type="font-24-600">
              Solve Ticket
            </Text>
            <Text className="text-secondary" type="body-2-regular">
              Are you sure you want to solve this ticket?
            </Text>
          </div>
        </ModalBody>
        <ModalFooter className="md:p-6 p-4">
          <div className="flex items-center gap-3 w-full">
            <ButtonCustom onClick={onVisible} className="w-full bg-neutral-50">
              <Text type="font-14-600" color="text-primary">
                Cancel
              </Text>
            </ButtonCustom>
            <ButtonCustom isLoading={loading} onClick={handleSolve} color="green" size="md" className="w-full">
              Solve
            </ButtonCustom>
          </div>
        </ModalFooter>
      </>
    </CustomModal>
  );
};
export default forwardRef(ModalSolveTicket);
