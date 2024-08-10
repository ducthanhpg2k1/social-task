import { API_PATH } from "@/utils/api.utils";
import { ERoleUser } from "@/utils/common";
import makeAxiosRequest from "@/utils/makeAxiosRequest";

export interface IGetOfferParams {
  q?: string;
  sort_field?: string;
  sort_type?: string;
  page: number;
  size: number;
}
export interface Asset {
  assets_id: string;
  block_number: number;
  collateral: number;
  created_at: string;
  deleted_at: string;
  description: string;
  name: string;
  duration: number;
  filled_by: string;
  id: string;
  log_index: number;
  network_id: string;
  offer_by: string;
  offer_by_wallet: {
    address: string;
    avatar: string;
    created_at: string;
    deleted_at: string;
    id: string;
    nonce: number;
    role: string;
    telegram_id: string;
    updated_at: string;
    username: string;
  };
  offer_index: number;
  price: number;
  status: string;
  tx_hash: string;
  updated_at: string;
  asset: {
    assets_name: string;
    assets_type: string;
    created_at: string;
    deleted_at: string;
    id: string;
    updated_at: string;
  };
}

export interface IResponseOffer {
  data: {
    items: Asset[];
    meta: {
      page: number;
      size: number;
      total_items: number;
      total_pages: number;
    };
  };
  status: boolean;
}
export const getOffers = (params: IGetOfferParams) => {
  return makeAxiosRequest({
    path: API_PATH.OFFER + "/all",
    method: "GET",
    params: params as any,
  });
};

export const getAssetOffers = (params: IGetOfferParams) => {
  return makeAxiosRequest({
    path: API_PATH.OFFER,
    method: "GET",
    params: params as any,
  });
};

export const getUsers = (params?: any) => {
  return makeAxiosRequest({
    path: API_PATH.ADMIN_USERS,
    method: "GET",
    params,
  });
};

export const deleteOfferAdmin = (id: string) => {
  return makeAxiosRequest({
    path: API_PATH.ADMIN_OFFER_ID(id),
    method: "DELETE",
  });
};

export const changeStatusOfferAdmin = (data: { status: string; is_admin: ERoleUser }, id: string) => {
  return makeAxiosRequest({
    path: API_PATH.CHANGE_STATUS_OFFER(id),
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
