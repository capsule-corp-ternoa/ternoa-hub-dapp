import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import { NftJsonData } from "../../../types";
import { getJsonDataUrl } from "../../../utils/strings";
import { NftsData } from "./types";

const initialState: NftsData = {};

export const nftsData = createSlice({
  name: "nftsData",
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ id: string; data: NftJsonData }>
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
  { data: NftJsonData },
  { id: string; source: string },
  { state: RootState }
>("nftsData/fetchJsonData", async ({ source }) => {
  const response = await axios.request<NftJsonData>({
    method: "GET",
    url: getJsonDataUrl(source),
    timeout: 1000 * 30,
  });
  const jsonData = response.data;
  return { data: jsonData };
});

export const jsonDataSelector = (state: RootState) => state.nftsData;
