import { configureStore } from "@reduxjs/toolkit";
import { dummySlice } from "./slices/dummySlice";

const rootReducer = {
  [dummySlice.name]: dummySlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
