import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OutdatedState } from "./types";

const initialState: OutdatedState = { marketplaces: {} };

export const outdated = createSlice({
  name: "outdated",
  initialState,
  reducers: {
    setMarketplaceAsOutdated: (
      state,
      action: PayloadAction<{ id: number; timestamp?: string }>
    ) => {
      state.marketplaces[action.payload.id] = action.payload.timestamp || null;
    },
    reset: () => {
      return initialState;
    },
  },
});
