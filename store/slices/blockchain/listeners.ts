import { AppStartListening } from "../../middlewares/listenerMiddleware";
import { nftsData } from "../nftsData";
import { nftApi } from "../nfts";

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
