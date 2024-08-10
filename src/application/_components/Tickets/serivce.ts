import { API_PATH } from "@/utils/api.utils";
import { EReportStatus } from "@/utils/common";
import makeAxiosRequest from "@/utils/makeAxiosRequest";

export const getReport = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.REPORT,
    method: "GET",
    params,
  });
};

export const updateStatusReport = (data: { status: EReportStatus }, id: string) => {
  return makeAxiosRequest({
    path: API_PATH.CHANGE_STATUS_REPORT(id),
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
