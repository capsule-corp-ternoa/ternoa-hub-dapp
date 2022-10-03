import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../index";
import { addFetchNftsJsonDataListener } from "../slices/nftsData/listeners";
import { addClearOnChangeAddressListener, addGetBalancesListener } from "../slices/blockchain/listeners";

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

addFetchNftsJsonDataListener(startAppListening);
addGetBalancesListener(startAppListening);
addClearOnChangeAddressListener(startAppListening);