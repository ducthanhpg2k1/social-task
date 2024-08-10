// import { useAccount, useSignMessage } from "wagmi";

// import useAccessToken from "@/hooks/useAccesToken";
// import makeAxiosRequest from "@/utils/makeAxiosRequest";
// import { useEffect } from "react";
// import { keccak256, stringToBytes } from "viem";
// import { API_PATH } from "@/utils/api.utils";
// import { ToastCustom } from "@/components/ui/Toast";

export function getMessage(nonce: number): string {
  return `Welcome. By signing this message you are verifying your digital identity. This is completely secure and does not cost anything! Nonce: ${nonce}`;
}

const useAuthWithWallet = () => {
  // const { data: signMessageData, error, signMessage } = useSignMessage();
  // const { accessToken, setAccessToken, removeAccessToken } = useAccessToken();
  // const { address, chainId = -1, isConnected, isDisconnected } = useAccount();
  // console.log(address, "address");
  // const handleLogin = async (signature: string) => {
  //   try {
  //     const response = await makeAxiosRequest({
  //       path: API_PATH.AUTH_LOGIN,
  //       method: "POST",
  //       body: JSON.stringify({
  //         address,
  //         signature,
  //       }),
  //     });
  //     if (response?.data?.access_token) {
  //       setAccessToken(response.data.access_token);
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };
  // const handleAuthWithAccountChange = async () => {
  //   const messageBytes = getMessage(0);
  //   // const messageDigest = keccak256(messageBytes);
  //   // #step 3: sign message with nonce
  //   signMessage({ message: messageBytes as any });
  //   // try {
  //   //   //   #step 2: get nonce from server
  //   //   const response = await makeAxiosRequest({
  //   //     path: `/auth/get-nonce/${address}`,
  //   //     method: "GET",
  //   //   });
  //   //   const messageBytes = getMessage(response?.data?.nonce);
  //   //   // const messageDigest = keccak256(messageBytes);
  //   //   // #step 3: sign message with nonce
  //   //   signMessage({ message: messageBytes as any });
  //   // } catch (error) {
  //   //   console.log("error :>> ", error);
  //   // }
  // };
  // useEffect(() => {
  //   //  #step 4: if signature is received, send it to server to get access token
  //   if (signMessageData) {
  //     handleLogin(signMessageData);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signMessageData]);
  // useEffect(() => {
  //   //   #step 1: detect account or network change
  //   if (isConnected && !accessToken) {
  //     handleAuthWithAccountChange();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address, chainId, isConnected, isDisconnected]);
  // useEffect(() => {
  //   if (isDisconnected) {
  //     removeAccessToken();
  //   }
  // }, [isDisconnected]);
};

export default useAuthWithWallet;
