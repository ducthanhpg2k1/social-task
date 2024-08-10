import { atomProfile } from "@/store/profile.store";
import { API_PATH } from "@/utils/api.utils";
import makeAxiosRequest from "@/utils/makeAxiosRequest";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";

const serviceGetInfo = (address: string, token?: string) => {
  if (token) {
    makeAxiosRequest({
      method: "GET",
      path: API_PATH.GET_INFO + `/${address}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return makeAxiosRequest({
    method: "GET",
    path: API_PATH.GET_INFO + `/${address}`,
  });
};

export const useProfile = () => {
  const wallet = useTonWallet();
  const [profile, setProfile] = useAtom(atomProfile);
  const { run } = useRequest(serviceGetInfo, {
    manual: true,
    onSuccess: (res) => {
      if (!!res.status) {
        setProfile(res?.data);
      }
    },
  });

  const onGetInfo = (token?: string) => {
    if (wallet) {
      run(wallet?.account?.address, token);
    }
  };
  return { profile, setProfile, onGetInfo };
};
