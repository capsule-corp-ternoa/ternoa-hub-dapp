import { blockchain, getBalances } from "./blockchain";
import { AppStartListening } from "../../middlewares/listenerMiddleware";
import { nftsData } from "../nftsData";
import { nftApi } from "../nfts";

export const addGetBalancesListener = (startListening: AppStartListening) => {
  startListening({
    actionCreator: blockchain.actions.setAddress,
    effect: async (action, listenerApi) => {
      const address = action.payload;
      const state = listenerApi.getOriginalState().blockchain;
      if (address && state.isConnected && state.address !== address) {
        listenerApi.dispatch(getBalances(address));
      }
    },
  });
  startListening({
    actionCreator: blockchain.actions.setBlockchainConnected,
    effect: async (action, listenerApi) => {
      const isConnected = action.payload;
      const address = listenerApi.getOriginalState().blockchain.address;
      if (isConnected && address) {
        listenerApi.dispatch(getBalances(address));
      }
    },
  });
};

export const addClearOnChangeAddressListener = (
  startListening: AppStartListening
) => {
  startListening({
    predicate: (_action, currentState, previousState) => {
      return (
        Boolean(previousState.blockchain.address) &&
        !currentState.blockchain.address
      );
    },
    effect: (_action, listenerApi) => {
      listenerApi.dispatch(nftsData.actions.reset());
      listenerApi.dispatch(nftApi.util.resetApiState());
    },
  });
};
