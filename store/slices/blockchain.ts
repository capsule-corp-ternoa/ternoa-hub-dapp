import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Balances, BlockchainState } from "./types";
import { balanceToNumber, getBalances as SDKgetBalances } from "ternoa-js";
import { RootState } from "..";

const initialState: BlockchainState = {
  isLoadingBalances: false,
  balances: undefined,
};

export const blockchain = createSlice({
  name: "blockchain",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBalances.pending, (state) => {
      state.isLoadingBalances = true;
    });
    builder.addCase(getBalances.fulfilled, (state, action) => {
      state.isLoadingBalances = false;
      state.balances = action.payload;
    });
    builder.addCase(getBalances.rejected, (state) => {
      state.isLoadingBalances = false;
    });
  },
});

export const getBalances = createAsyncThunk<
  Balances,
  string,
  { state: RootState }
>("blockchain/getBalances", async (address) => {
  const response = await SDKgetBalances(address);
  const balances = {
    free: balanceToNumber(response.free),
    reserved: balanceToNumber(response.reserved),
    miscFrozen: balanceToNumber(response.miscFrozen),
    feeFrozen: balanceToNumber(response.feeFrozen),
  };
  return balances;
});
