export type Nft = {
  id: string;
  nodeId: string;
  price: string;
  offchainData: string;
  owner: string;
  creator: string;
};

export type NftDetail = {
  id: string;
  nodeId: string;
  price: string;
  offchainData: string;
  owner: string;
  creator: string;
  collectionId: string;
  royalty: string;
  mintFee: string;
  isCapsule: string;
  isSecret: string;
  isSoulbound: string;
  isListed: string;
};

export type Collection = {
  nodeId: string;
  id: string;
  collectionId: string;
  owner: string;
  offchainData: string;
  nbNfts: string;
  limit: string;
}

export type NftDetailWithCollection = NftDetail & { collection: Collection }

export type NftQueryResponse = {
  nftEntities: {
    nodes: Nft[];
    pageInfo: {
      hasNextPage: boolean;
    };
  };
};

export type NftQueryParams = {
  address: string;
  pagination: PaginationFilter;
  filter: Filter;
};

export type NftDetailQueryParams = {
  nftId: string;
};


export type NftDetailQueryResponse = {
  nftEntity: NftDetailWithCollection
};

export type NftByMarketplaceQueryParams = {
  marketplaceId: string;
  pagination: PaginationFilter;
};

export type NftReducerState = {
  nfts: Nft[];
  hasNextPage: boolean;
};

export type NftDetailReducerState = {
  nftDetail: NftDetailWithCollection
};

export type PaginationFilter = {
  first: number;
  offset: number;
};

export enum Filter {
  "Owned" = "Owned",
  "Created" = "Created",
  "On Sale" = "On Sale",
  "Not Listed" = "Not Listed",
}
