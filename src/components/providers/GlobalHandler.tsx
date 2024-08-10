import { useAuthTon } from "@/hooks/useAuthTon";

type Props = {};

const GlobalHandler = (props: Props) => {
  // useAuthWithWallet();
  // useAuthWalletSonala();
  useAuthTon();
  // useInitialFetcher();

  // const { data: walletClient } = useWalletClient();
  // let signer: any = null;

  // if (walletClient?.transport) {
  //   const provider = new ethers.providers.Web3Provider(walletClient?.transport as any);
  //   signer = provider.getSigner(walletClient?.account.address);
  // }

  // useEffect(() => {
  //   const f = async () => {
  //     if (signer) {
  //       preMarkets.ethereum.network.signer = signer;
  //       preMarkets.bsc.network.signer = signer;
  //       preMarkets.arbitrum.network.signer = signer;
  //       preMarkets.base.network.signer = signer;
  //       preMarkets.merlin.network.signer = signer;
  //       preMarkets.blast.network.signer = signer;
  //       preMarkets.optimism.network.signer = signer;
  //       preMarkets.linea.network.signer = signer;
  //     }
  //   };
  //   f();

  //   return () => {
  //     preMarkets.ethereum.network.signer = undefined;
  //     preMarkets.bsc.network.signer = undefined;
  //     preMarkets.arbitrum.network.signer = undefined;
  //     preMarkets.base.network.signer = undefined;
  //     preMarkets.merlin.network.signer = undefined;
  //     preMarkets.blast.network.signer = undefined;
  //     preMarkets.optimism.network.signer = undefined;
  //     preMarkets.linea.network.signer = undefined;
  //   };
  // }, [signer]);

  // const { sendTransaction, connected, publicKey } = useWallet();
  // const connectorSol = useWallet();

  // // register signer for solana
  // useEffect(() => {
  //   if (connected) {
  //     preMarkets.solana.network.signer = connectorSol;
  //     preMarkets.solana.userPublicKey = publicKey!;
  //   }

  //   return () => {
  //     preMarkets.solana.network.signer = undefined;
  //     preMarkets.solana.userPublicKey = undefined;
  //   };
  // }, [connected, publicKey]);

  return <></>;
};

export default GlobalHandler;
