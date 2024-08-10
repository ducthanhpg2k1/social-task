import { ToastCustom } from "@/components/ui/Toast";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { setCookie } from "cookies-next";
import { ErrorCode } from "./errors.utilts";
import { localStorageUtils } from "./local-storage-utils";
import { ROUTE_PATH } from "./route";

type MakeFetchRequestProps = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  headers?: Record<string, string>;
  accessToken?: string;
  params?: { [key: string]: string | string[] };
  prefix?: string;
};

export default async function makeAxiosRequest(props: MakeFetchRequestProps): Promise<AxiosResponse> {
  const { path, method, body, headers, accessToken, params, prefix } = props;
  let token;
  if (localStorage?.getItem("accessToken")) {
    token = JSON?.parse(localStorage?.getItem("accessToken") || "");
  }
  let url = `${prefix ?? process.env.NEXT_PUBLIC_SERVER_URL}${path}`;

  const axiosOptions: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params,
    data: body,
  };

  if (token !== "" || accessToken !== "") {
    axiosOptions.headers = {
      ...axiosOptions.headers,
      ["Authorization"]: `Bearer ${token || accessToken}`,
    };
  }

  try {
    const response = await axios(axiosOptions);
    return response?.data;
  } catch (error: any) {
    if (error?.response?.data?.code === ErrorCode.E999401) {
      ToastCustom.error(error?.response?.data?.code?.message ?? error?.response?.data?.message);
      localStorageUtils.clear();
      setCookie("accessToken", "");
      window.location.href = ROUTE_PATH.SIGN_IN;
    }

    if (error?.response?.data?.code === ErrorCode.E999404) {
      ToastCustom.error(error?.response?.data?.code?.message ?? error?.response?.data?.message);
    }
    throw error;
  }
}
