import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import { FeeType } from "../../../types";

export enum MatketpaceKind {
  Private = "Private",
  Public = "Public",
}

export type Marketplace = {
  id: string;
  owner: string;
  kind: MarketplaceKind;
  offchainData: string;
  createdAt: string;
  updatedAt: string;
  commissionFee: string;
  commissionFeeType: FeeType;
  listingFee: string;
  listingFeeType: FeeType;
  accountList?: string[];
};

export type MarketplaceQueryResponse = {
  marketplaceEntities: {
    nodes: Marketplace[];
  };
};

export type MarketplaceQueryParams = {
  id: number;
};

export type MarketplaceReducerState = {
  marketplace: Marketplace;
};
