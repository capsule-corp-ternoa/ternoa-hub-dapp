import { SerializedError } from "@reduxjs/toolkit";
import { MarketplaceJsonData } from "../../../types";

export type MarketplacesDataState = {
  isLoading: boolean;
  error?: SerializedError;
};

export type MarketplacesData = {
  [id: string]: {
    jsonData?: MarketplaceJsonData;
    state: MarketplacesDataState;
  };
};
