import { configureStore } from "@reduxjs/toolkit";
import { blockchain } from "./slices/blockchain";

const rootReducer = {
  [blockchain.name]: blockchain.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
