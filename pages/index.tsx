import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nft from "../components/Nft";
import styles from "../styles/Home.module.css";
import { NFT } from "../types/NFT";

const Home: NextPage = () => {
  const address = useAddress();
  const [nftMetadata, setNftMetadata] = useState<NFT[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNfts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-nfts");
      const data = await response.json();

      setNftMetadata(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNfts();
  }, []);

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <h1>Select an NFT to Mint</h1>
          {loading && <p>Loading...</p>}
          <div className={styles.NFTs}>
            {nftMetadata &&
              nftMetadata.map((nft) => <Nft key={nft.id} nft={nft} />)}
          </div>
        </>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};

export default Home;
