import { fetchJsonData } from ".";
import { AppStartListening } from "../../middlewares/listenerMiddleware";
import { marketplaceApi } from "../marketplaces";

export const addFetchMarketplacesJsonDataListener = (
  startListening: AppStartListening
) => {
  startListening({
    matcher: marketplaceApi.endpoints.getMarketplacesByOwner.matchFulfilled,
    effect: async (action, listenerApi) => {
      const marketplaces = action.payload.marketplaces;
      marketplaces.forEach((marketplace) => {
        if (marketplace.offchainData) {
          listenerApi.dispatch(
            fetchJsonData({
              id: marketplace.id,
              source: marketplace.offchainData,
            })
          );
        }
      });
    },
  });
};
export const addFetchMarketplaceJsonDataListener = (
  startListening: AppStartListening
) => {
  startListening({
    matcher: marketplaceApi.endpoints.getMarketplaceById.matchFulfilled,
    effect: async (action, listenerApi) => {
      const marketplace = action.payload.marketplace;
      if (marketplace.offchainData) {
        listenerApi.dispatch(
          fetchJsonData({
            id: marketplace.id,
            source: marketplace.offchainData,
          })
        );
      }
    },
  });
};
