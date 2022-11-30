import { isAnyOf } from "@reduxjs/toolkit";
import { fetchJsonData } from ".";
import { AppStartListening } from "../../middlewares/listenerMiddleware";
import { nftApi } from "../nfts";
import { Nft } from "../nfts/types";

export const addFetchNftsJsonDataListener = (
  startListening: AppStartListening
) => {
  startListening({
    matcher: isAnyOf(
      nftApi.endpoints.getNftsByAddress.matchFulfilled,
      nftApi.endpoints.getNftsByMarketplace.matchFulfilled
    ),
    effect: async (action, listenerApi) => {
      const nfts = action.payload.nfts;
      nfts.forEach((nft: Nft) =>
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
