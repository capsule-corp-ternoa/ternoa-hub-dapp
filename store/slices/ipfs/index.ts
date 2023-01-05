import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { IpfsUploadFileResponse } from "../../../pages/api/ipfs";
import { uploadFile } from "../../../services/ipfs";
import { IpfsData } from "./types";

const initialState: IpfsData = { status: { loadingState: "idle" } };

export const ipfs = createSlice({
  name: "ipfs",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(uploadToIpfs.pending, (state) => {
      state.status = {
        loadingState: "loading",
        error: undefined,
      };
    });
    builder.addCase(uploadToIpfs.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = {
        loadingState: "finished",
        error: undefined,
      };
    });
    builder.addCase(uploadToIpfs.rejected, (state, action) => {
      state.status = {
        loadingState: "finished",
        error: action.error,
      };
    });
  },
});

export const uploadToIpfs = createAsyncThunk<
  IpfsUploadFileResponse,
  string | Blob,
  { state: RootState }
>("ipfs/uploadToIpfs", async (file, thunkApi) => {
  const network = thunkApi.getState().blockchain.currentNetwork;
  const response = await uploadFile(file, network);
  return response;
});
