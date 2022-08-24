import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DummyState } from "./types";

const initialState: DummyState = {
  data: "",
};

export const dummySlice = createSlice({
  name: "dummySlice",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});
