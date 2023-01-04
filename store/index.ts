import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";
import { indexerApi } from "./services/indexerApi";
import { blockchain } from "./slices/blockchain/blockchain";
import { marketplacesData } from "./slices/marketplacesData";
import { nftsData } from "./slices/nftsData";
import { outdated } from "./slices/outdated";
import { ipfs } from "./slices/ipfs";
import { blockchainTx } from "./slices/blockchainTx";

const rootReducer = {
  [indexerApi.reducerPath]: indexerApi.reducer,
  [blockchain.name]: persistReducer(
    {
      key: blockchain.name,
      storage: storage,
      whitelist: ["currentNetwork"],
    },
    blockchain.reducer
  ),
  [nftsData.name]: nftsData.reducer,
  [marketplacesData.name]: marketplacesData.reducer,
  [outdated.name]: persistReducer(
    {
      key: outdated.name,
      storage: storage,
    },
    outdated.reducer
  ),
  [ipfs.name]: ipfs.reducer,
  [blockchainTx.name]: blockchainTx.reducer,
};

const middlewares = [listenerMiddleware.middleware, indexerApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "blockchainTx/submitSignedTx/fulfilled",
        ],
        ignoredPaths: ["blockchainTx.data"],
      },
    }).concat(middlewares);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
