import Dropdown from "@/components/ui/Dropdown";
import HeaderMain from "../HeaderMain";
import {
  EFilterDuration,
  EOfferStatus,
  EOrderStatus,
  EReportStatus,
  EStatusUser,
  ETypeOffer,
  TYPE_ASSETS,
} from "@/utils/common";
import { useMemo, useRef, useState } from "react";
import { Globe, Note, Tag, TelegramLogo, Users } from "@phosphor-icons/react";
import { Ticket } from "lucide-react";

import CardPreview from "./CardPreview";
import CardChart from "./CardChart";
import CardChartTypes from "./CardChartTypes";
import {
  getDashboardReport,
  getDataChartOffers,
  getDataChartOrderTypes,
  getDataChartOrders,
  getDataChartTickets,
  getDataChartUsers,
} from "./serivce";
import { useMount, useRequest } from "ahooks";
import CustomTooltip from "@/components/ui/CustomTooltip";
import Text from "@/components/ui/Text";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { options, optionsTypes } from "./optionsTooltipChart";

const DataStatus = [
  {
    id: 1,
    label: "Success",
    status: EOfferStatus?.FILLED,
    color: "brand-500",
  },
  {
    id: 2,
    label: "Cancelled",
    status: EOfferStatus?.CANCELLED,
    color: "error-500",
  },
  {
    id: 3,
    label: "Listing",
    status: EOfferStatus?.ACTIVE,
    color: "info-500",
  },
  {
    id: 4,
    label: "Delisted",
    status: EOfferStatus?.INACTIVE,
    color: "neutral-500",
  },
];

const Dashboard = () => {
  const [selectedKeys, setSelectedKeys] = useState([TYPE_ASSETS?.DOMAIN]);

  const refParamsSearch = useRef<any>({
    startDate: dayjs().subtract(1, "month").toDate(),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const { data: dataReport, run } = useRequest(getDashboardReport, {
    manual: true,
  });

  const { data: dataChartOffers, run: runOffers } = useRequest(getDataChartOffers, {
    manual: true,
  });
  const { data: dataChartUsers, run: runUsers } = useRequest(getDataChartUsers, {
    manual: true,
  });
  const { data: dataChartOrders, run: runOrders } = useRequest(getDataChartOrders, {
    manual: true,
  });
  const { data: dataChartTickets, run: runTickets } = useRequest(getDataChartTickets, {
    manual: true,
  });
  const { data: dataOrdersTypes, run: runOrderTypes } = useRequest(getDataChartOrderTypes, {
    manual: true,
  });

  const percentOrderTypes = useMemo(() => {
    const total = dataOrdersTypes?.data.total_domains + dataOrdersTypes?.data.total_telegram_handles;

    return (
      [
        (dataOrdersTypes?.data.total_domains / total) * 100,
        (dataOrdersTypes?.data.total_telegram_handles / total) * 100,
      ] || []
    );
  }, [dataOrdersTypes?.data]);

  const { dataTotalActive, dataTotalCancelled, dataTotalInactive, dataTotalCompleted } = useMemo(() => {
    const dataTotalActive = dataChartOffers?.data?.map((item: any) => Number(item?.total_active));
    const dataTotalCancelled = dataChartOffers?.data?.map((item: any) => Number(item?.total_cancelled));
    const dataTotalInactive = dataChartOffers?.data?.map((item: any) => Number(item?.total_inactive));
    const dataTotalCompleted = dataChartOffers?.data?.map((item: any) => Number(item?.total_completed));

    return {
      dataTotalActive,
      dataTotalCancelled,
      dataTotalInactive,
      dataTotalCompleted,
    };
  }, [dataChartOffers?.data]);

  const { totalActiveUser, totalSuspended } = useMemo(() => {
    const totalActiveUser = dataChartUsers?.data?.map((item: any) => Number(item?.total_active));
    const totalSuspended = dataChartUsers?.data?.map((item: any) => Number(item?.total_suspended));
    return {
      totalActiveUser,
      totalSuspended,
    };
  }, [dataChartUsers?.data]);

  const { totalCancelled, totalCompleted } = useMemo(() => {
    const totalCancelled = dataChartOrders?.data?.map((item: any) => Number(item?.total_cancelled));
    const totalCompleted = dataChartOrders?.data?.map((item: any) => Number(item?.total_completed));
    return {
      totalCancelled,
      totalCompleted,
    };
  }, [dataChartOrders?.data]);

  const { totalInprogress, totalResolved } = useMemo(() => {
    const totalInprogress = dataChartTickets?.data?.map((item: any) => Number(item?.total_inprogress));
    const totalResolved = dataChartTickets?.data?.map((item: any) => Number(item?.total_resolved));
    return {
      totalInprogress,
      totalResolved,
    };
  }, [dataChartTickets?.data]);

  const { labelsOffers, labelsUsers, labelsOrders, labelsTickets } = useMemo(() => {
    const labelsOffers = dataChartOffers?.data?.map((item: any) => dayjs(item?.order_duration).format("DD/MM/YYYY"));
    const labelsUsers = dataChartUsers?.data?.map((item: any) => dayjs(item?.order_duration).format("DD/MM/YYYY"));
    const labelsOrders = dataChartOrders?.data?.map((item: any) => dayjs(item?.order_duration).format("DD/MM/YYYY"));
    const labelsTickets = dataChartTickets?.data?.map((item: any) => dayjs(item?.order_duration).format("DD/MM/YYYY"));

    return {
      labelsOffers,
      labelsUsers,
      labelsOrders,
      labelsTickets,
    };
  }, [dataChartOffers?.data, dataChartUsers?.data, dataChartOrders?.data, dataChartTickets?.data]);

  const dataOfferTypes = {
    labels: [ETypeOffer?.ON_SELL, ETypeOffer?.AUCTION],
    datasets: [
      {
        data: [45, 55],
        backgroundColor: ["#26BA73", "#F97316"],
        hoverBackgroundColor: ["#26BA73", "#F97316"],
      },
    ],
  };

  const dataOrderTypes = {
    labels: [TYPE_ASSETS?.DOMAIN, TYPE_ASSETS?.TELEGRAM_HANDLE],
    datasets: [
      {
        data: percentOrderTypes,
        backgroundColor: ["#26BA73", "#00B1FF"],
        hoverBackgroundColor: ["#26BA73", "#00B1FF"],
      },
    ],
  };

  const dataOrders = {
    labels: labelsOrders,
    datasets: [
      {
        data: totalCompleted,
        borderColor: "#22C55E",
        backgroundColor: "##22C55E",
        borderWidth: 2,
        pointBackgroundColor: "white",
        typeChart: EOrderStatus?.PURCHASE_COMPLETED,
      },
      {
        data: totalCancelled,
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
        pointBackgroundColor: "white",
        borderWidth: 2,
        typeChart: EOrderStatus?.CANCELLED,
      },
    ],
  };

  const dataTickets = {
    labels: labelsTickets,
    datasets: [
      {
        data: totalInprogress,
        borderColor: "#22C55E",
        backgroundColor: "##22C55E",
        borderWidth: 2,
        pointBackgroundColor: "white",
        typeChart: EReportStatus?.RESOLVED,
      },
      {
        data: totalResolved,
        borderColor: "#00B1FF",
        backgroundColor: "#00B1FF",
        pointBackgroundColor: "white",
        borderWidth: 2,
        typeChart: EReportStatus?.IN_PROGRESS,
      },
    ],
  };
  const dataUsers = {
    labels: labelsUsers,
    datasets: [
      {
        data: totalActiveUser,
        borderColor: "#22C55E",
        backgroundColor: "#22C55E",
        borderWidth: 2,
        pointBackgroundColor: "white",
        typeChartUser: EStatusUser?.ACTIVE,
      },
      {
        data: totalSuspended,
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
        pointBackgroundColor: "white",
        borderWidth: 2,
        typeChartUser: EStatusUser?.SUSPENDED,
      },
    ],
  };

  const dataOffers = {
    labels: labelsOffers,
    datasets: [
      {
        data: dataTotalActive,
        borderColor: "#00B1FF",
        backgroundColor: "#00B1FF",
        borderWidth: 2,
        pointBackgroundColor: "white",
        typeChart: EOfferStatus?.ACTIVE,
      },
      {
        data: dataTotalCancelled,
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
        pointBackgroundColor: "#FFF",

        borderWidth: 2,

        typeChart: EOfferStatus?.CANCELLED,
      },
      {
        data: dataTotalInactive,
        borderColor: "#9EA8B6",
        backgroundColor: "#9EA8B6",
        pointBackgroundColor: "white",

        borderWidth: 2,

        typeChart: EOfferStatus?.INACTIVE,
      },
      {
        data: dataTotalCompleted,
        borderColor: "#22C55E",
        backgroundColor: "#22C55E",
        borderWidth: 2,
        pointBackgroundColor: "white",

        typeChart: EOfferStatus?.FILLED,
      },
    ],
  };

  useMount(() => {
    onSearch();
  });

  const onSearch = (data?: any) => {
    const d = data || refParamsSearch.current;

    const newParams = {
      start_date: d.startDate,
      end_date: d.endDate,
    };
    run(newParams);
    runOffers(newParams);
    runUsers(newParams);
    runOrders(newParams);
    runTickets(newParams);
    runOrderTypes(newParams);
  };

  const handleValueChange = (newValue: any) => {
    if (newValue?.startDate) {
      refParamsSearch.current = newValue;
      onSearch(newValue);
    } else {
      const newParams = {
        startDate: dayjs().subtract(1, "month").toDate(),
        endDate: dayjs().format("YYYY-MM-DD"),
      };
      refParamsSearch.current = newParams;

      onSearch(newParams);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <HeaderMain
        title="Dashboard"
        suffix={
          <div className="flex items-center gap-3 ">
            <CustomTooltip
              text={
                <Text type="font-14-400" className="text-white dark:text-info-950 ">
                  Asset type
                </Text>
              }
            >
              <a>
                <Dropdown
                  selectedKeys={selectedKeys}
                  setSelectedKeys={(e: any) => {
                    setSelectedKeys(e);
                  }}
                  items={[
                    {
                      key: "domain",
                      label: "Domain",
                    },
                  ]}
                />
              </a>
            </CustomTooltip>
            <Datepicker
              primaryColor={"green"}
              placeholder="Select range date"
              separator={"-"}
              displayFormat="DD/MM/YYYY"
              inputClassName={"date-picker"}
              value={refParamsSearch?.current}
              onChange={handleValueChange}
              showShortcuts={true}
            />
          </div>
        }
      />
      <div className="gap-6 grid grid-cols-2 md::grid-cols-4 lg:grid-cols-6">
        {/* {GROUP_CARD?.map((item) => {
          const isPositiveNumber = item?.value > 0;
          return <CardPreview item={item} isPositiveNumber={isPositiveNumber} key={item?.id} />;
        })} */}
        <CardPreview
          total={dataReport?.data?.total_users}
          title="Total Users"
          icon={<Users size={32} className="text-secondary" />}
        />
        <CardPreview
          total={dataReport?.data?.total_domains}
          title="Domains"
          icon={<Globe size={32} className="text-secondary" />}
        />

        <CardPreview
          total={dataReport?.data?.total_telegram_handles}
          title="Telegram Handles"
          icon={<TelegramLogo size={32} className="text-secondary" />}
        />
        <CardPreview
          total={dataReport?.data?.order?.total_price?.toFixed(2) || 0}
          title="Total Orders"
          icon={<Note size={32} className="text-secondary" />}
        />
        <CardPreview
          total={dataReport?.data?.offer?.total_price?.toFixed(2) || 0}
          title="Total Offers"
          icon={<Tag size={32} className="text-secondary" />}
        />
        <CardPreview
          total={dataReport?.data?.total_unsolved_tickets || 0}
          title="Unsolved Ticket"
          icon={<Ticket size={32} className="text-secondary" />}
        />
      </div>
      <div className="grid grid-cols-6 gap-6">
        <CardChart title="Offers" data={dataOffers} options={options} dataStatus={DataStatus} />
        <CardChartTypes
          title="Offer Types"
          data={dataOfferTypes}
          options={optionsTypes}
          dataTypes={[
            {
              id: 1,
              label: "On Sell",
              value: ETypeOffer?.ON_SELL,
            },
            {
              id: 2,
              label: "On Auction",
              value: ETypeOffer?.AUCTION,
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-6 gap-6">
        <CardChart
          title="Orders"
          data={dataOrders}
          options={options}
          dataStatus={[
            {
              id: 1,
              label: "Success",
              status: EOfferStatus?.FILLED,
              color: "brand-500",
            },
            {
              id: 2,
              label: "Cancelled",
              status: EOfferStatus?.CANCELLED,
              color: "error-500",
            },
          ]}
        />
        <CardChartTypes
          title="Order Types"
          data={dataOrderTypes}
          options={optionsTypes}
          dataTypes={[
            {
              id: 1,
              label: "Domain",
              value: TYPE_ASSETS?.DOMAIN,
            },
            {
              id: 2,
              label: "Telegram Handle",
              value: TYPE_ASSETS?.TELEGRAM_HANDLE,
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-6 gap-6">
        <CardChart
          title="Tickets"
          data={dataTickets}
          typeStatus="circle"
          options={options}
          dataStatus={[
            {
              id: 1,
              label: "Resolved",
              status: EReportStatus?.RESOLVED,
            },
            {
              id: 2,
              label: "In Progress",
              status: EReportStatus?.IN_PROGRESS,
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-6 gap-6">
        <CardChart
          title="Users"
          typeStatus="circle"
          data={dataUsers}
          options={options}
          dataStatus={[
            {
              id: 1,
              label: "Active",
              status: EStatusUser?.ACTIVE,
            },
            {
              id: 2,
              label: "Suspended",
              status: EStatusUser?.SUSPENDED,
            },
          ]}
        />
      </div>
    </div>
  );
};
export default Dashboard;
