import { API_PATH } from "@/utils/api.utils";
import makeAxiosRequest from "@/utils/makeAxiosRequest";

export const getDashboardReport = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.REPORT_DASHBOARD,
    method: "GET",
    params,
  });
};

export const getDataChartOffers = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.GENERAL_OFFERS,
    method: "GET",
    params,
  });
};

export const getDataChartUsers = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.GENERAL_USERS,
    method: "GET",
    params,
  });
};

export const getDataChartOrders = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.GENERAL_ORDERS,
    method: "GET",
    params,
  });
};

export const getDataChartTickets = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.GENERAL_TICKETS,
    method: "GET",
    params,
  });
};

export const getDataChartOrderTypes = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.GENERAL_ORDER_TYPES,
    method: "GET",
    params,
  });
};
