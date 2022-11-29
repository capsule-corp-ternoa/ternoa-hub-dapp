import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { safeDisconnect, initializeApi, getRawApi } from "ternoa-js";
import { RootState } from "../..";
import { MAINNET_NETWORK } from "../../../constants/network";
import { Network } from "../../../types";
import type { BlockchainState } from "./types";
import * as networks from "../../../constants/network";

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
    builder.addCase(connect.pending, (state, action) => {
      state.isConnecting = true;
      state.isConnected = false;
    });
    builder.addCase(connect.fulfilled, (state, action) => {
      state.currentNetwork = action.payload;
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

export const connect = createAsyncThunk<
  Network,
  string | undefined,
  { state: RootState }
>("blockchain/connect", async (networkName, thunkApi) => {
  let selectedNetwork = thunkApi.getState().blockchain.currentNetwork;
  if (networkName) {
    Object.values(networks).forEach((_network) => {
      if (_network.name.toLowerCase() === networkName.toLowerCase()) {
        selectedNetwork = _network;
      }
    });
  }
  await initializeApi(selectedNetwork.blockchainUrl);
  thunkApi.dispatch(subscribe());
  return selectedNetwork;
});

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
