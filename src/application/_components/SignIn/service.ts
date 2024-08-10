import { API_PATH } from "@/utils/api.utils";
import makeAxiosRequest from "@/utils/makeAxiosRequest";

export const serviceLogin = (values: { account_name: string; password: string }) => {
  return makeAxiosRequest({
    path: API_PATH.AUTH_LOGIN_WITH_ACCOUNT,
    method: "POST",
    body: JSON.stringify(values),
  });
};
