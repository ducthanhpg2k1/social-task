/* eslint-disable react-hooks/exhaustive-deps */
import { API_PATH } from "@/utils/api.utils";
import makeAxiosRequest from "@/utils/makeAxiosRequest";
import {
  Account,
  TonProofItemReplySuccess,
  Wallet,
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import useAccessToken from "./useAccesToken";
import { ToastCustom } from "@/components/ui/Toast";
import axios from "axios";
import { useProfile } from "./useProfile";

const apiGeneratePayload = () => {
  return axios.get("https://tonapi.io/v2/tonconnect/payload");
};

export const useAuthTon = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [token, setToken] = useState<any>("");
  const { accessToken, setAccessToken } = useAccessToken();
  const { onGetInfo } = useProfile();
  const onAuthTon = () => {};

  useEffect(() => {
    onGeneratePayload();
  }, []);
  useEffect(
    () =>
      tonConnectUI.onStatusChange(async (w) => {
        console.log(w, "w");

        if (w && w.connectItems?.tonProof && "proof" in w.connectItems.tonProof) {
          handleLogin(w.connectItems.tonProof.proof, w);
        }
      }),
    [tonConnectUI]
  );

  const onGeneratePayload = async () => {
    const res = await apiGeneratePayload();
    tonConnectUI.setConnectRequestParameters({ state: "loading" });
    if (res?.data?.payload) {
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: { tonProof: res?.data?.payload },
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  };

  const handleLogin = async (proof: TonProofItemReplySuccess["proof"], wallet_info: Wallet) => {
    if (proof && wallet_info) {
      const reqBody = {
        wallet_info,
        proof: {
          ...proof,
          state_init: wallet_info.account.walletStateInit,
        },
      };
      console.log("<<--- Login");
      try {
        const response = await makeAxiosRequest({
          path: API_PATH.AUTH_LOGIN,
          method: "POST",
          body: JSON.stringify(reqBody),
        });
        if (response?.data?.access_token) {
          setToken(response.data.access_token);
          setAccessToken(response.data.access_token);
          ToastCustom.success("Connected wallet successfully");
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };
  useEffect(() => {
    if (accessToken && wallet) {
      onGetInfo();
    }
  }, [accessToken, wallet]);
  return {
    onAuthTon,
  };
};
