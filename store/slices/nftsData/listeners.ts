import { fetchJsonData } from ".";
import { AppStartListening } from "../../middlewares/listenerMiddleware";
import { nftApi } from "../nfts";

export const addFetchNftsJsonDataListener = (
  startListening: AppStartListening
) => {
  startListening({
    matcher: nftApi.endpoints.getNftsByAdress.matchFulfilled,
    effect: async (action, listenerApi) => {
      const nfts = action.payload.nfts;
      nfts.forEach((nft) =>
        listenerApi.dispatch(
          fetchJsonData({
            id: nft.id,
            source: nft.offchainData,
          })
        )
      );
    },
  });
};
