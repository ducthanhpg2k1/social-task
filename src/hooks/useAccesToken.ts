import { useLocalStorage } from "usehooks-ts";
import { setCookie } from "cookies-next";

export default function useAccessToken() {
  const [token, setToken] = useLocalStorage("accessToken", "");

  const setAccessToken = (accessToken: string) => {
    setToken(accessToken);
    setCookie("accessToken", accessToken);
  };

  const removeAccessToken = () => {
    console.log("123");
    setToken("");
    setCookie("accessToken", "");
  };
  return {
    accessToken: token,
    setAccessToken,
    removeAccessToken,
  };
}
