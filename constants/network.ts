import { Network } from "../types";

export const ALPHANET_NETWORK: Network = {
  name: "Alphanet",
  indexerUrl: process.env.NEXT_PUBLIC_ALPHANET_INDEXER_URL!,
  blockchainUrl: process.env.NEXT_PUBLIC_ALPHANET_BLOCKCHAIN_URL!,
  ternoaChain: process.env.NEXT_PUBLIC_ALPHANET_TERNOA_CHAIN!,
  ipfsUrl: process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_BASE_URL!,
};

export const MAINNET_NETWORK: Network = {
  name: "Mainnet",
  indexerUrl: process.env.NEXT_PUBLIC_MAINNET_INDEXER_URL!,
  blockchainUrl: process.env.NEXT_PUBLIC_MAINNET_BLOCKCHAIN_URL!,
  ternoaChain: process.env.NEXT_PUBLIC_MAINNET_TERNOA_CHAIN!,
  ipfsUrl: process.env.NEXT_PUBLIC_MAINNET_IPFS_GATEWAY_BASE_URL!,
};
