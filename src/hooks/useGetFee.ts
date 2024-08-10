import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { atom, useAtom } from "jotai";

const atomNetworkFee = atom<number>(0);
export const useGetFee = () => {
  const [networkFee, setNetWorkFee] = useAtom(atomNetworkFee);
  // Connect to cluster
  const getFee = async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const payer = Keypair.generate();
    const payee = Keypair.generate();

    const recentBlockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
      recentBlockhash: recentBlockhash.blockhash,
      feePayer: payer.publicKey,
    }).add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: payee.publicKey,
        lamports: 10,
      })
    );

    const fees = await transaction.getEstimatedFee(connection);
    if (fees) {
      const solFee = fees / 10000000;
      setNetWorkFee(solFee);
    }
  };

  return {
    getFee,
    networkFee,
    setNetWorkFee,
  };
};
