import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import { fetchFromIpfs } from "../../../services/ipfs";
import { MarketplaceJsonData } from "../../../types";
import { MarketplacesData } from "./types";

const initialState: MarketplacesData = {};

export const marketplacesData = createSlice({
  name: "marketplacesData",
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ id: string; data: MarketplaceJsonData }>
    ) => {
      state[action.payload.id].jsonData = action.payload.data;
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchJsonData.pending, (state, action) => {
      state[action.meta.arg.id] = {
        state: { isLoading: true },
      };
    });
    builder.addCase(fetchJsonData.fulfilled, (state, action) => {
      state[action.meta.arg.id] = {
        jsonData: action.payload.data,
        state: { isLoading: false },
      };
    });
    builder.addCase(fetchJsonData.rejected, (state, action) => {
      state[action.meta.arg.id] = {
        state: { isLoading: false, error: action.error },
      };
    });
  },
});

export const fetchJsonData = createAsyncThunk<
  { data: MarketplaceJsonData },
  { id: string; source: string },
  { state: RootState }
>("marketplacesData/fetchJsonData", async ({ source }) => {
  const marketplaceOffchainData = await fetchFromIpfs<MarketplaceJsonData>(
    source
  );
  const jsonData = marketplaceOffchainData;
  return { data: jsonData };
});

export const jsonDataSelector = (state: RootState) => state.marketplacesData;
