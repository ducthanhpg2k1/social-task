import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

// import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
// import { QueryClient } from "@tanstack/react-query";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

import { useTheme } from "@/hooks/useTheme";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

// const queryClient = new QueryClient();

const AppProvider = (props: Props) => {
  const { children } = props;
  const { theme } = useTheme();

  return (
    <TonConnectUIProvider
      manifestUrl="https://escrow-market-fe-dev.uslab.dev/json/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/escrow_m_bot/start",
      }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "safepalwallet",
            name: "SafePal",
            imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
            aboutUrl: "https://www.safepal.com/download",
            jsBridgeKey: "safepalwallet",
            platforms: ["ios", "android", "chrome", "firefox"],
          },
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"],
          },
        ],
      }}
      uiPreferences={{ theme: theme === "light" ? THEME.LIGHT : THEME.DARK }}
    >
      <>{children}</>
      <ProgressBar height="2px" color="#00f5a0" options={{ showSpinner: false }} shallowRouting />
    </TonConnectUIProvider>
  );
};

export default AppProvider;
