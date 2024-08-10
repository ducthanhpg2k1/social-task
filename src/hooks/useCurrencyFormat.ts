import makeAxiosRequest from "@/utils/makeAxiosRequest";
import { useAtom, atom } from "jotai";

const atomPriceUsd = atom<number>(0);

export const useCurrencyFormat = () => {
  const [priceInUsd, setPriceInUsd] = useAtom(atomPriceUsd);
  const getPriceInUSD = async (cryptoSymbol = "solana" as const) => {
    const response: any = await makeAxiosRequest({
      path: `/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd`,
      method: "GET",
      prefix: "https://api.coingecko.com",
    });
    if (response) {
      const price = response?.[cryptoSymbol]?.usd;
      setPriceInUsd(price);
    }
  };
  const formatPriceInUsd = (amount: number) => {
    return amount ? (priceInUsd * amount).toLocaleString("en-US", { maximumFractionDigits: 1 }) : "";
  };

  return {
    getPriceInUSD,
    priceInUsd,
    formatPriceInUsd,
  };
};
