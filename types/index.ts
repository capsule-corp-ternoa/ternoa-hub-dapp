export type LoadingState = "idle" | "loading" | "finished";

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

export type Network = {
  name: string;
  indexerUrl: string;
  blockchainUrl: string;
  ternoaChain: string;
  ipfsUrl: string;
  ipfsKey: string;
};

export class WalletConnectRejectedRequest extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, WalletConnectRejectedRequest.prototype);
  }
}
