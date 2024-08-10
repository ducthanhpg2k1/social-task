import Text from "@/components/ui/Text";
import Chip from "@/components/ui/chip";
import TableCustom from "@/components/ui/table";
import dayjs from "dayjs";
import Image from "next/image";
import { useRef, useState } from "react";

import { ButtonCustom } from "@/components/ui/ButtonCustom";
import Dropdown from "@/components/ui/Dropdown";
import DropdownCustom from "@/components/ui/DropdownCustom";
import InputSearch from "@/components/ui/InputSearch";
import NoDataTable from "@/components/ui/NoDataTable";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { EReportStatus, TYPE_ASSETS, renderTextReport } from "@/utils/common";
import { shortenAddress } from "@/utils/wallet.helper";
import { ChatCircleDots, Check, ClockCounterClockwise, DotsThreeVertical, SquaresFour, X } from "@phosphor-icons/react";
import { useDebounceFn, useMount, useRequest } from "ahooks";
import { useRouter } from "next/router";
import HeaderMain from "../HeaderMain";
import ModalSolveTicket from "./ModalSolveTicket";
import ModalCancelOfferTicket from "./ModalCancelOfferTicket";
import CustomPagination from "@/components/ui/CustomPagination/CustomPagination";
import ModalViewSettleChat from "./ModalViewSettleChat";
import { getReport } from "./serivce";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "buyyer",
    label: "Buyyer",
  },
  {
    key: "seller",
    label: "Seller",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "description",
    label: "Message",
  },

  {
    key: "status",
    label: "Status",
  },
  {
    key: "filled_order",
    label: "Filled Order At",
  },
  {
    key: "reported_at",
    label: "Reported At",
  },
  {
    key: "action",
    label: "Action",
  },
];

interface IGetReportParams {
  q: string;
  page: number;
  size: number;
  status?: EReportStatus;
}

const Tickets = () => {
  const router = useRouter();
  const { formatPriceInUsd } = useCurrencyFormat();
  const [selectedKeys, setSelectedKeys] = useState([TYPE_ASSETS?.DOMAIN]);
  const [dataStatus, setDataStatus] = useState([""]);
  const refParamsSearch = useRef<IGetReportParams>({
    q: "",
    page: 1,
    size: 10,
  });

  const refModalViewSettleChats: any = useRef();
  const refModalSolveTicket: any = useRef();
  const refModalCancelOfferTicket: any = useRef();

  const {
    data: datareport,
    loading,
    run,
  } = useRequest(getReport, {
    manual: true,
    onSuccess() {},
  });
  useMount(() => {
    run(refParamsSearch.current);
  });

  const onSearch = (data: IGetReportParams) => {
    refParamsSearch.current = data;
    run(data);
  };

  const onChangePage = (page: number) => {
    if (page !== refParamsSearch.current.page) {
      const params: IGetReportParams = {
        ...refParamsSearch.current,
        page: page,
      };
      onSearch(params);
    }
  };

  const { run: onChangeSearch } = useDebounceFn(
    (e) => {
      const keySearch = e.target.value;
      const params: IGetReportParams = {
        ...refParamsSearch.current,
        q: keySearch,
      };
      onSearch(params);
    },
    {
      wait: 500,
    }
  );

  const handleClickMenuItem = (key: string, item: any) => {
    if (key === "view_settle_chat") {
      refModalViewSettleChats?.current?.onOpen();
    }
    if (key === "solve") {
      refModalSolveTicket?.current?.onOpen(item?.id);
    }
    if (key === "cancel") {
      refModalCancelOfferTicket?.current?.onOpen(item?.id);
    }
  };
  const reloadList = () => {
    run(refParamsSearch.current);
  };

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2 w-[200px] md:w-[250px]">
            <Image width={24} height={24} alt="ic-ai" src={"/icons/icAI.svg"} />
            <Text className="primary cursor-pointer" type="font-16-600">
              {user?.order?.asset?.assets_name}
            </Text>
          </div>
        );
      case "seller":
        return (
          <Text className="text-primary line-clamp-1" type="font-14-400">
            {shortenAddress(user?.order?.seller?.address)}
          </Text>
        );
      case "buyyer":
        return (
          <Text className="text-primary line-clamp-1" type="font-14-400">
            {shortenAddress(user?.report_by?.address)}
          </Text>
        );
      case "description":
        return (
          <div className="w-[400px]">
            <Text className="text-primary line-clamp-1" type="font-14-400">
              {user?.reason}
            </Text>
          </div>
        );

      case "price":
        return (
          <div className="flex gap-2 md:w-full w-[100px]">
            <div className="mt-[2px]">
              <Image
                alt="ic-solana"
                width={20}
                className="w-5 md:w-5 aspect-square"
                height={20}
                src={"/images/ic-toncoi-logo.png"}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Text className="text-primary" type="font-16-600">
                {user?.order?.price}
              </Text>
              <Text className="text-secondary" type="body-4-regular">
                {`~$${formatPriceInUsd(user?.order?.price)}`}
              </Text>
            </div>
          </div>
        );
      case "filled_order":
        return (
          <div className="flex flex-col gap-1">
            <Text className="text-primary" type="font-16-400">
              {dayjs(user?.order?.created_at).format("DD MMM YYYY")}
            </Text>
            <Text className="text-secondary" type="body-4-regular">
              {dayjs(user?.order?.created_at).format("h:mm A")}
            </Text>
          </div>
        );
      case "reported_at":
        return (
          <div className="flex flex-col gap-1">
            <Text className="text-primary" type="font-16-400">
              {dayjs(user?.created_at).format("DD MMM YYYY")}
            </Text>
            <Text className="text-secondary" type="body-4-regular">
              {dayjs(user?.created_at).format("h:mm A")}
            </Text>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-col gap-1">
            <Chip text={renderTextReport(user?.status)} status={user?.status} />
          </div>
        );
      case "action":
        return (
          <div className="flex justify-end pr-3">
            <DropdownCustom
              placement="bottom-end"
              handleClickMenuItem={(key) => handleClickMenuItem(key, user)}
              items={
                user?.status === EReportStatus?.IN_PROGRESS
                  ? [
                      {
                        key: "solve",
                        label: "Solve",
                        icon: <Check size={20} className="text-primary" />,
                      },
                      {
                        key: "chat_buyer",
                        label: "Chat Buyer",
                        icon: <ChatCircleDots size={20} className="text-primary" />,
                      },
                      {
                        key: "chat_seller",
                        label: "Chat Seller",
                        icon: <ChatCircleDots size={20} className="text-primary" />,
                      },
                      {
                        key: "view_settle_chat",
                        label: "View Settle Chat",
                        icon: <ClockCounterClockwise size={20} className="text-primary" />,
                      },
                      {
                        key: "cancel",
                        label: "Cancel Offer",
                        icon: <X size={20} className="text-primary" />,
                      },
                    ]
                  : [
                      {
                        key: "chat_buyer",
                        label: "Chat Buyer",
                        icon: <ChatCircleDots size={20} className="text-primary" />,
                      },
                      {
                        key: "chat_seller",
                        label: "Chat Seller",
                        icon: <ChatCircleDots size={20} className="text-primary" />,
                      },
                      {
                        key: "view_settle_chat",
                        label: "View Settle Chat",
                        icon: <ClockCounterClockwise size={20} className="text-primary" />,
                      },
                      {
                        key: "cancel",
                        label: "Cancel Offer",
                        icon: <X size={20} className="text-primary" />,
                      },
                    ]
              }
            >
              <ButtonCustom radius="full" isIconOnly size="sm" variant="light">
                <DotsThreeVertical size={20} className="text-primary" />
              </ButtonCustom>
            </DropdownCustom>
          </div>
        );

      default:
        return cellValue;
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <HeaderMain
        suffix={
          <div className="flex items-center gap-3">
            <Dropdown
              selectedKeys={dataStatus}
              prefixLabel="Status"
              placement="bottom-start"
              placeholder="All"
              setSelectedKeys={(e: any) => {
                setDataStatus([e?.currentKey]);
                const params: IGetReportParams = {
                  ...refParamsSearch.current,
                  status: e?.currentKey,
                };
                onSearch(params);
              }}
              items={[
                {
                  key: EReportStatus?.RESOLVED,
                  label: "Resolved",
                },
                {
                  key: EReportStatus?.IN_PROGRESS,
                  label: "In Progress",
                },
              ]}
            />
          </div>
        }
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 p-6 bg-background-primary rounded-3xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <SquaresFour size={20} className="text-neutral-600" />
              <Text type="font-14-400" className="text-neutral-600">
                {`${datareport?.data?.meta?.total_items || 0} Tickets`}
              </Text>
            </div>
            <InputSearch placeholder="Search by buyer or seller address" onChange={onChangeSearch} />
          </div>
          <TableCustom
            renderCell={renderCell}
            columns={columns}
            isStriped={true}
            emptyContent={<NoDataTable text="You have no tickets yet" />}
            dataSource={datareport?.data?.items || []}
            loading={loading}
          />
        </div>
        <div className="flex justify-end">
          <CustomPagination
            total={datareport?.data?.meta?.total_pages}
            page={datareport?.data?.meta?.page}
            onChangePage={onChangePage}
          />
        </div>
      </div>

      <ModalViewSettleChat ref={refModalViewSettleChats} />
      <ModalSolveTicket reloadList={reloadList} ref={refModalSolveTicket} />
      <ModalCancelOfferTicket reloadList={reloadList} ref={refModalCancelOfferTicket} />
    </div>
  );
};
export default Tickets;
