import Text from "@/components/ui/Text";
import Chip from "@/components/ui/chip";
import TableCustom from "@/components/ui/table";
import dayjs from "dayjs";
import Image from "next/image";
import { useRef, useState } from "react";

import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomPagination from "@/components/ui/CustomPagination/CustomPagination";
import Dropdown from "@/components/ui/Dropdown";
import DropdownCustom from "@/components/ui/DropdownCustom";
import InputSearch from "@/components/ui/InputSearch";
import NoDataTable from "@/components/ui/NoDataTable";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import {
  EOfferStatus,
  EOrderStatus,
  ERoleUser,
  STATUS_ORDERS,
  capitalized,
  renderTextStatusOrder,
} from "@/utils/common";
import { DotsThreeVertical, SquaresFour, X } from "@phosphor-icons/react";
import { useDebounceFn, useMount, useRequest } from "ahooks";
import HeaderMain from "../HeaderMain";
import ModalDeleteOrder from "./ModalDeleteOrder";
import { getOrderAdmin } from "./serivce";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "purchase_date",
    label: "Purchase date",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "action",
    label: "",
  },
];

interface IGetOrdersParams {
  q: string;
  page: number;
  size: number;
  is_admin?: ERoleUser;
  status?: EOfferStatus;
}

const Orders = () => {
  const { formatPriceInUsd } = useCurrencyFormat();
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const refModalDeleteOrder: any = useRef();

  const refParamsSearch = useRef<IGetOrdersParams>({
    q: "",
    page: 1,
    size: 10,
    is_admin: ERoleUser?.ADMIN,
  });

  const {
    data: dataOrder,
    loading,
    run,
  } = useRequest(getOrderAdmin, {
    manual: true,
  });

  useMount(() => {
    run(refParamsSearch.current);
  });

  const onSearch = (data: IGetOrdersParams) => {
    refParamsSearch.current = data;
    run(data);
  };

  const onChangePage = (page: number) => {
    if (page !== refParamsSearch.current.page) {
      const params: IGetOrdersParams = {
        ...refParamsSearch.current,
        page: page,
      };
      onSearch(params);
    }
  };

  const { run: onChangeSearch } = useDebounceFn(
    (e) => {
      const keySearch = e.target.value;
      const params: IGetOrdersParams = {
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
    if (key === "cancel") {
      refModalDeleteOrder?.current?.onOpen(item?.id);
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
          <div className="flex items-center gap-2 w-[200px] md:w-[335px]">
            <Image width={24} height={24} alt="ic-ai" src={"/icons/icAI.svg"} />
            <Text className="primary cursor-pointer hover:text-brand-500 hover:underline" type="font-16-600">
              {user?.asset?.assets_name}
            </Text>
          </div>
        );
      case "type":
        return (
          <Text className="text-primary" type="font-16-400">
            {user?.asset?.assets_type ? capitalized(user?.asset?.assets_type) : "-"}
          </Text>
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
                {user?.price}
              </Text>
              <Text className="text-secondary" type="body-4-regular">
                {`~$${formatPriceInUsd(user?.price)}`}
              </Text>
            </div>
          </div>
        );
      case "purchase_date":
        return (
          <div className="flex flex-col gap-1">
            <Text className="text-primary" type="font-16-400">
              {dayjs(user?.offer_by_wallet?.created_at).format("DD MMM YYYY")}
            </Text>
            <Text className="text-secondary" type="body-4-regular">
              {dayjs(user?.offer_by_wallet?.created_at).format("h:mm A")}
            </Text>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-col gap-1">
            <Chip text={renderTextStatusOrder(user?.status)} status={user?.status} />
          </div>
        );
      case "action":
        return (
          <div className="w-full flex justify-end pr-3">
            <DropdownCustom
              placement="bottom-end"
              handleClickMenuItem={(key) => handleClickMenuItem(key, user)}
              items={
                user?.status === EOrderStatus.PURCHASE_COMPLETED
                  ? [
                      {
                        key: "cancel",
                        label: "Cancel",
                        icon: <X size={20} className="text-primary" />,
                      },
                    ]
                  : []
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
        title="Orders"
        suffix={
          <div className="flex items-center gap-3">
            <Dropdown
              placement="bottom-start"
              selectedKeys={selectedKeys}
              prefixLabel="Status"
              placeholder="All"
              setSelectedKeys={(e: any) => {
                setSelectedKeys([e?.currentKey]);
                const params: IGetOrdersParams = {
                  ...refParamsSearch.current,
                  status: e?.currentKey,
                };
                onSearch(params);
              }}
              items={STATUS_ORDERS}
            />
          </div>
        }
      />
      <div className="flex flex-col mb-8">
        <div className="flex flex-col gap-3 w-full p-6 bg-background-primary rounded-3xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <SquaresFour size={20} className="text-neutral-600" />
              <Text type="font-14-400" className="text-neutral-600">
                {`${dataOrder?.data?.meta?.total_items} Orders`}
              </Text>
            </div>
            <InputSearch placeholder="Search for telegram username" onChange={onChangeSearch} />
          </div>
          <TableCustom
            renderCell={renderCell}
            isStriped={true}
            columns={columns}
            emptyContent={<NoDataTable text="You have no orders yet" />}
            dataSource={dataOrder?.data?.items || []}
            loading={loading}
          />
        </div>
        <div className="flex justify-end">
          <CustomPagination
            total={dataOrder?.data?.meta?.total_pages}
            page={dataOrder?.data?.meta?.page}
            onChangePage={onChangePage}
          />
        </div>
      </div>
      <ModalDeleteOrder reloadList={reloadList} ref={refModalDeleteOrder} />
    </div>
  );
};
export default Orders;
