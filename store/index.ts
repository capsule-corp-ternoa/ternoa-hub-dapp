import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";
import { indexerApi } from "./services/indexerApi";
import { blockchain } from "./slices/blockchain/blockchain";
import { nftsData } from "./slices/nftsData";

const rootReducer = {
  [indexerApi.reducerPath]: indexerApi.reducer,
  [blockchain.name]: blockchain.reducer,
  [nftsData.name]: nftsData.reducer,
};

const middlewares = [listenerMiddleware.middleware, indexerApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewares);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
