"use client";

import AppProvider from "@/components/providers/AppProvider";
// import GlobalHandler from "@/components/providers/GlobalHandler";
import "@/styles/globals.css";
import "@/styles/text.css";
import "@/styles/ton-custom.css";
import "@/styles/color.css";

// import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useTheme } from "@/hooks/useTheme";
import { useMount } from "ahooks";
import GlobalHandler from "@/components/providers/GlobalHandler";

export const SEO: DefaultSeoProps = {
  titleTemplate: "Escrow Market",
  defaultTitle: "Escrow Market",
  description: "The best marketplace for digital assets", // TODO: Update later
  twitter: {
    cardType: "summary_large_image",
    handle: "@loot",
    site: "@loot",
  },
  openGraph: {
    title: "Escrow Market",
    description: "The best marketplace for digital assets", // TODO: Update later
    images: [
      {
        url: "/banner.png",
        width: 800,
        height: 400,
        alt: "Escrow Market Banner Alt",
      },
    ],
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const { getPriceInUSD } = useCurrencyFormat();
  const { initTheme } = useTheme();
  useEffect(() => {
    getPriceInUSD();
  }, []);
  useMount(() => {
    initTheme();
  });
  return (
    <AppProvider>
      <DefaultSeo {...SEO} />
      <GlobalHandler />
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </AppProvider>
  );
}
