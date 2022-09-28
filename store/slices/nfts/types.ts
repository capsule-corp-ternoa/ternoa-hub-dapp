export type Nft = {
  id: string;
  nodeId: string;
  price: string;
  offchainData: string;
  owner: string;
  creator: string;
};

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

export type NftReducerState = {
  nfts: Nft[];
  hasNextPage: boolean;
};

export type PaginationFilter = {
  first: number;
  offset: number;
};

export enum Filter {
  "Created" = "Created",
  "Owned" = "Owned",
  "On Sale" = "On Sale",
}
