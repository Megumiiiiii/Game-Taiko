import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ThirdwebProvider
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 167005, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://rpc.test.taiko.xyz"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chains native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "Ether",
          symbol: "ETH",
        },
        shortName: "taiko-a3", // Display value shown in the wallet UI
        slug: "Taiko", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "Taiko", // Name of the network
        name: "Taiko (Alpha-3 Testnet)", // Name of the network
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
