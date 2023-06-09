import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
  useMetamask,
} from "@thirdweb-dev/react";
import { CHARACTER_EDITION_ADDRESS } from "../const/contractAddresses";
import MintContainer from "../components/MintContainer";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { contract: editionDrop } = useContract(
    CHARACTER_EDITION_ADDRESS,
    "edition-drop"
  );

  const address = useAddress();
  const router = useRouter();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  <iframe
    src="https://ipfs-2.thirdwebcdn.com/ipfs/QmUe6MdTHr4it2k7rMkLZZ44TGWVKZSFEcYCbrCzuD7LP4/erc1155.html?contract=0x27744c481f93592684D5092E70e0b49cF37eF53B&chain=%7B%22name%22%3A%22Taiko+%28Alpha-3+Testnet%29%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Ftaiko-alpha-3-testnet.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22taiko-a3%22%2C%22chainId%22%3A167005%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22taiko-alpha-3-testnet%22%7D&tokenId=0&primaryColor=purple"

    ></iframe>

  // 0. Wallet Connect - required to check if they own an NFT
  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    );
  }

  // 1. Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Something went wrong
  if (!ownedNfts || isError) {
    return <div>Error</div>;
  }

  // 2. No NFTs - mint page
  if (ownedNfts.length === 0) {
    return (
      <div className={styles.container}>
        <MintContainer />
      </div>
    );
  }

  // 3. Has NFT already - show button to take to game
  return (
    <div className={styles.container}>
      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() => router.push(`/play`)}
      >
        Play Game
      </button>
    </div>
  );


};

export default Home;
