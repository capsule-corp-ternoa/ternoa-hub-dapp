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
import { nftsData } from "./slices/nftsData";

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
};

const middlewares = [listenerMiddleware.middleware, indexerApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
