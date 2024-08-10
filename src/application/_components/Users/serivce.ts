import { API_PATH } from "@/utils/api.utils";
import { EStatusUser } from "@/utils/common";
import makeAxiosRequest from "@/utils/makeAxiosRequest";

export const getUsers = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.ADMIN_USERS,
    method: "GET",
    params,
  });
};

export const changeStatusUserAdmin = (data: { status: EStatusUser }, id: string) => {
  return makeAxiosRequest({
    path: API_PATH.CHANGE_STATUS_USER(id),
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
