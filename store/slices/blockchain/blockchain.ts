import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { safeDisconnect, initializeApi, getRawApi } from "ternoa-js";
import { RootState } from "../..";
import { MAINNET_NETWORK } from "../../../constants/network";
import { Network } from "../../../types";
import type { BlockchainState } from "./types";

const initialState: BlockchainState = {
  isConnecting: false,
  isConnected: false,
  address: undefined,
  currentNetwork: MAINNET_NETWORK,
};

export const blockchain = createSlice({
  name: "blockchain",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string | undefined>) => {
      state.address = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(changeNetwork.pending, (state) => {
      state.isConnecting = true;
      state.isConnected = false;
    });
    builder.addCase(changeNetwork.fulfilled, (state, action) => {
      state.isConnecting = false;
      state.currentNetwork = action.payload;
      state.isConnected = true;
    });
    builder.addCase(changeNetwork.rejected, (state) => {
      state.isConnecting = false;
    });
    builder.addCase(connect.pending, (state) => {
      state.isConnecting = true;
      state.isConnected = false;
    });
    builder.addCase(connect.fulfilled, (state, action) => {
      state.isConnecting = false;
      state.isConnected = true;
    });
    builder.addCase(connect.rejected, (state) => {
      state.isConnecting = false;
    });
  },
});

export const changeNetwork = createAsyncThunk<
  Network,
  Network,
  { state: RootState }
>("blockchain/changeNetwork", async (network: Network, thunkApi) => {
  await safeDisconnect();
  await initializeApi(network.blockchainUrl);
  thunkApi.dispatch(subscribe());
  return network;
});

export const connect = createAsyncThunk<void, undefined, { state: RootState }>(
  "blockchain/connect",
  async (_p, thunkApi) => {
    const endpoint =
      thunkApi.getState().blockchain.currentNetwork.blockchainUrl;
    await initializeApi(endpoint);
    thunkApi.dispatch(subscribe());
  }
);

export const subscribe = createAsyncThunk<void, undefined>(
  "blockchain/subscribe",
  async (_p, thunkApi) => {
    const api = getRawApi();
    api.on("connected", () => {
      thunkApi.dispatch(blockchain.actions.setStatus(true));
    });
    api.on("disconnected", () => {
      thunkApi.dispatch(blockchain.actions.setStatus(false));
    });
  }
);
