import Chip from "@/components/ui/chip";
import TableCustom from "@/components/ui/table";
import Text from "@/components/ui/Text";
import { useRef, useState } from "react";
import dayjs from "dayjs";

import { getUsers } from "./serivce";
import { useDebounceFn, useMount, useRequest } from "ahooks";
import { EStatusUser, renderTextUsers } from "@/utils/common";
import NoDataTable from "@/components/ui/NoDataTable";

import HeaderMain from "../HeaderMain";
import Dropdown from "@/components/ui/Dropdown";
import InputSearch from "@/components/ui/InputSearch";
import { shortenAddress } from "@/utils/wallet.helper";
import DropdownCustom from "@/components/ui/DropdownCustom";
import { ButtonCustom } from "@/components/ui/ButtonCustom";
import { DotsThreeVertical, UserPlus, UserMinus, Check, Copy, SquaresFour } from "@phosphor-icons/react";
import ModalActionUser from "./ModalActionUser";
import CustomPagination from "@/components/ui/CustomPagination/CustomPagination";

const columns = [
  {
    key: "name",
    label: "Telegram Username",
  },
  {
    key: "wallet",
    label: "Wallet",
  },
  {
    key: "offer_quantity",
    label: "Offers",
  },

  {
    key: "order_quantity",
    label: "Orders",
  },
  {
    key: "created_at",
    label: "Joined Date",
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

interface IGetReportParams {
  q: string;
  page: number;
  size: number;
  status?: EStatusUser;
}

const Users = () => {
  const [dateFilter, setDateFilter] = useState([""]);
  const refModalActionUser: any = useRef();
  const [hoverWallet, setHoverWallet] = useState<string>("");
  const [isCopy, setIsCopy] = useState(false);

  const refParamsSearch = useRef<IGetReportParams>({
    q: "",
    page: 1,
    size: 10,
  });

  const {
    data: dataUsers,
    loading,
    run,
  } = useRequest(getUsers, {
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
    refModalActionUser?.current?.onOpen(item);
  };
  const reloadList = () => {
    run(refParamsSearch.current);
  };

  const onCopy = (address: string) => {
    navigator.clipboard.writeText(address as any);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1500);
  };

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2 w-[200px] md:w-[335px]">
            {user?.username ? (
              <Text className="text-primary cursor-pointer hover:text-brand-500 hover:underline" type="font-16-500">
                {user?.username}
              </Text>
            ) : (
              <Text className="text-neutral-400 cursor-pointer hover:text-brand-500 hover:underline" type="font-16-500">
                {"unnamed"}
              </Text>
            )}
          </div>
        );
      case "wallet":
        return (
          <div
            className="flex items-center gap-2 h-full w-[150px]"
            onMouseMove={() => setHoverWallet(user?.address)}
            onMouseLeave={() => setHoverWallet("")}
          >
            <Text
              onClick={() => window.open(`https://tonviewer.com/${user?.address}`)}
              className="text-primary cursor-pointer hover:text-brand-500 hover:underline"
              type="font-16-400"
            >
              {shortenAddress(user?.address)}
            </Text>
            {hoverWallet === user?.address && (
              <>
                {isCopy ? (
                  <Check size={18} className="text-brand-500" />
                ) : (
                  <Copy size={18} className="primary cursor-pointer" onClick={() => onCopy(user?.address)} />
                )}
              </>
            )}
          </div>
        );

      case "offer_quantity":
        return (
          <Text className="text-primary cursor-pointer" type="font-16-400">
            {user?.offers?.length}
          </Text>
        );
      case "order_quantity":
        return (
          <Text className="text-primary cursor-pointer" type="font-16-400">
            {user?.orders?.length}
          </Text>
        );
      case "created_at":
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
            <Chip
              text={renderTextUsers(user?.status)}
              color={user?.status === EStatusUser?.SUSPENDED ? "error" : "success"}
            />
          </div>
        );
      case "action":
        return (
          <div className="flex justify-end pr-3">
            <DropdownCustom
              placement="bottom-end"
              handleClickMenuItem={(key) => handleClickMenuItem(key, user)}
              items={[
                {
                  key: user?.status === EStatusUser?.ACTIVE ? EStatusUser?.SUSPENDED : EStatusUser?.ACTIVE,
                  label: user?.status === EStatusUser?.ACTIVE ? "Suspend" : "Activate",
                  icon:
                    user?.status === EStatusUser?.ACTIVE ? (
                      <UserMinus size={20} className="text-primary" />
                    ) : (
                      <UserPlus size={20} className="text-primary" />
                    ),
                },
              ]}
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
        title="Users"
        suffix={
          <div className="flex items-center gap-3">
            <Dropdown
              selectedKeys={dateFilter}
              prefixLabel="Status"
              placement="bottom-start"
              placeholder="All"
              setSelectedKeys={(e: any) => {
                setDateFilter([e?.currentKey]);
                const params: IGetReportParams = {
                  ...refParamsSearch.current,
                  status: e?.currentKey,
                };
                onSearch(params);
              }}
              items={[
                {
                  key: EStatusUser?.ACTIVE,
                  label: "Active",
                },
                {
                  key: EStatusUser?.SUSPENDED,
                  label: "Suspended",
                },
              ]}
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
                {`${dataUsers?.data?.meta?.total_items || 0} Users`}
              </Text>
            </div>
            <InputSearch placeholder="Search for telegram username" onChange={onChangeSearch} />
          </div>
          <TableCustom
            isStriped={true}
            renderCell={renderCell}
            columns={columns}
            emptyContent={<NoDataTable text="You have no users yet" />}
            dataSource={dataUsers?.data?.items || []}
            loading={loading}
          />
        </div>
        <div className="flex justify-end">
          <CustomPagination
            total={dataUsers?.data?.meta?.total_pages}
            page={dataUsers?.data?.meta?.page}
            onChangePage={onChangePage}
          />
        </div>
      </div>
      <ModalActionUser reloadList={reloadList} ref={refModalActionUser} />
    </div>
  );
};
export default Users;
