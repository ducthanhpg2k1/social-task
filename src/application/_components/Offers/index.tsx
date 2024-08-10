import Text from "@/components/ui/Text";
import Chip from "@/components/ui/chip";
import TableCustom from "@/components/ui/table";
import dayjs from "dayjs";
import Image from "next/image";
import { useRef, useState } from "react";

import Dropdown from "@/components/ui/Dropdown";
import InputSearch from "@/components/ui/InputSearch";
import NoDataTable from "@/components/ui/NoDataTable";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { EOfferStatus, ERoleUser, STATUS_OFFERS, capitalized, renderTextStatusOffer } from "@/utils/common";
import { useDebounceFn, useMount, useRequest } from "ahooks";
import HeaderMain from "../HeaderMain";
import { getAssetOffers } from "./serivce";

import { ButtonCustom } from "@/components/ui/ButtonCustom";
import CustomPagination from "@/components/ui/CustomPagination/CustomPagination";
import DropdownCustom from "@/components/ui/DropdownCustom";
import { DotsThreeVertical, MinusCircle, SquaresFour, Trash } from "@phosphor-icons/react";
import ModalDeleteOffer from "./ModalDeleteOffer";
import ModalDelistOffer from "./ModalDelistOffer";

const columns = [
  {
    key: "name",
    label: "Username",
  },
  {
    key: "type",
    label: "Offer Type",
  },
  {
    key: "price",
    label: "Sale Price",
  },
  {
    key: "filled_offer_at",
    label: "Filled Offer At",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "action",
    label: "Action",
  },
];

interface IGetOffersParams {
  q: string;
  page: number;
  size: number;
  is_admin?: ERoleUser;
  status?: EOfferStatus;
}

const Offers = () => {
  const { formatPriceInUsd } = useCurrencyFormat();
  const [selectedKeys, setSelectedKeys] = useState([""]);

  const refModalDeleteOffer: any = useRef();
  const refModalDelistOffer: any = useRef();

  const refParamsSearch = useRef<IGetOffersParams>({
    q: "",
    page: 1,
    size: 10,
    is_admin: ERoleUser?.ADMIN,
  });

  const {
    data: dataOffer,
    loading,
    run,
  } = useRequest(getAssetOffers, {
    manual: true,
  });

  useMount(() => {
    run(refParamsSearch.current);
  });

  const onSearch = (data: IGetOffersParams) => {
    refParamsSearch.current = data;
    run(data);
  };

  const onChangePage = (page: number) => {
    if (page !== refParamsSearch.current.page) {
      const params: IGetOffersParams = {
        ...refParamsSearch.current,
        page: page,
      };
      onSearch(params);
    }
  };

  const { run: onChangeSearch } = useDebounceFn(
    (e) => {
      const keySearch = e.target.value;
      const params: IGetOffersParams = {
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
    if (key === "delete") {
      refModalDeleteOffer?.current?.onOpen(item?.id);
    } else {
      refModalDelistOffer?.current?.onOpen(item?.id);
    }
  };

  const reloadList = () => {
    run(refParamsSearch.current);
  };

  const renderDropdown = (data: any) => {
    let dataDropdown: any = [];
    if (data?.status === EOfferStatus.ACTIVE) {
      dataDropdown = [
        {
          key: "action",
          label: "Delist",
          icon: <MinusCircle size={20} className="text-primary" />,
        },
        {
          key: "delete",
          label: "Delete",
          icon: <Trash size={20} className="text-primary" />,
        },
      ];
    } else {
      dataDropdown = [
        {
          key: "delete",
          label: "Delete",
          icon: <Trash size={20} className="text-primary" />,
        },
      ];
    }

    return dataDropdown;
  };

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2 w-[200px] md:w-[335px]">
            <Image width={24} height={24} alt="ic-ai" src={"/icons/icAI.svg"} />
            <Text className="primary cursor-pointer" type="font-16-600">
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
      case "filled_offer_at":
        return (
          <div className="flex flex-col gap-1">
            <Text className="text-primary" type="font-16-400">
              {user?.order?.created_at ? dayjs(user?.order?.created_at).format("DD MMM YYYY") : ""}
            </Text>
            <Text className="text-secondary" type="body-4-regular">
              {user?.order?.created_at ? dayjs(user?.order?.created_at).format("h:mm A") : ""}
            </Text>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-col gap-1">
            <Chip text={renderTextStatusOffer(user?.status)} status={user?.status} />
          </div>
        );
      case "action":
        return (
          <div className="flex justify-end pr-3">
            <DropdownCustom
              placement="bottom-end"
              handleClickMenuItem={(key) => handleClickMenuItem(key, user)}
              items={renderDropdown(user)}
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
        title="Offers"
        suffix={
          <div className="flex items-center gap-3">
            <Dropdown
              placement="bottom-start"
              selectedKeys={selectedKeys}
              prefixLabel="Status"
              placeholder="All"
              setSelectedKeys={(e: any) => {
                setSelectedKeys([e?.currentKey]);
                const params: IGetOffersParams = {
                  ...refParamsSearch.current,
                  status: e?.currentKey,
                };
                onSearch(params);
              }}
              items={STATUS_OFFERS}
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
                {`${dataOffer?.data?.meta?.total_items || 0} Offers`}
              </Text>
            </div>
            <InputSearch placeholder="Search for telegram username" onChange={onChangeSearch} />
          </div>
          <TableCustom
            renderCell={renderCell}
            isStriped={true}
            columns={columns}
            emptyContent={<NoDataTable text="You have no offers yet" />}
            dataSource={dataOffer?.data?.items || []}
            loading={loading}
          />
        </div>
        <div className="flex justify-end">
          <CustomPagination
            total={dataOffer?.data?.meta?.total_pages}
            page={dataOffer?.data?.meta?.page}
            onChangePage={onChangePage}
          />
        </div>
      </div>
      <ModalDeleteOffer reloadList={reloadList} ref={refModalDeleteOffer} />
      <ModalDelistOffer reloadList={reloadList} ref={refModalDelistOffer} />
    </div>
  );
};
export default Offers;
