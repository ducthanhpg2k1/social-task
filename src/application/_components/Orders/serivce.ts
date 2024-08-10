import { API_PATH } from "@/utils/api.utils";
import { EOrderStatus, ERoleUser } from "@/utils/common";
import makeAxiosRequest from "@/utils/makeAxiosRequest";

export const getUsers = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.ADMIN_USERS,
    method: "GET",
    params,
  });
};

export const getOrderAdmin = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.ORDER,
    method: "GET",
    params,
  });
};

export const cancelOrderAdmin = (data: { status: EOrderStatus; boc?: string }, id: string) => {
  return makeAxiosRequest({
    path: API_PATH.FORCE_CANCEL_ORDER(id),
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const changeStatusOfferAdmin = (data: { status: string; is_admin: ERoleUser }, id: string) => {
  return makeAxiosRequest({
    path: API_PATH.CHANGE_STATUS_OFFER(id),
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
