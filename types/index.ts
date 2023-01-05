export type LoadingState = "idle" | "loading" | "finished";

export enum FeeType {
  Percentage = "Percentage",
  Flat = "Flat",
}

export enum TxType {
  CreateNFT = "CREATE_NFT",
  CreateCollection = "CREATE_COLLECTION",
  CreateMarketplace = "CREATE_MARKETPLACE",
  SetMarketplaceConfiguration = "SET_MARKETPLACE_CONFIGURATION",
  ListNft = "LIST_NFT",
}
export interface NftJsonData {
  title: string;
  description: string;
  image: string;
  properties: {
    media: {
      hash: string;
      type: string;
      size: string;
    };
  };
}

export interface CollectionJsonData {
  name: string;
  description: string;
  profile_image: string;
  banner_image: string;
  isSensitive: boolean;
}

export interface MarketplaceJsonData {
  name: string;
  logo: string;
  mainColor?: string;
}

export type Network = {
  name: string;
  indexerUrl: string;
  blockchainUrl: string;
  ternoaChain: string;
  ipfsUrl: string;
};

export type IpfsServiceData = {
  url: string;
  key: string;
};

export type Feature = {
  name: string;
  description: string;
};

export class WalletConnectRejectedRequest extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, WalletConnectRejectedRequest.prototype);
  }
}

export class InvalidNetworkName extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidNetworkName.prototype);
  }
}

export class NotRetryableError extends Error {
  originalError: unknown;
  constructor(message: string, originalError: unknown) {
    super(message);
    this.originalError = originalError;
    Object.setPrototypeOf(this, NotRetryableError.prototype);
  }
}
