import { gql } from "graphql-request";
import { RootState } from "../..";
import { FeeType } from "../../../types";
import { indexerApi } from "../../services/indexerApi";
import {
  Marketplace,
  MarketplaceQueryParams,
  MarketplaceQueryResponse,
  MarketplaceReducerState,
  MarketplacesReducerState,
  MarketplacesQueryParams,
} from "./types";

const checkOutdatedData = (marketplaceData: Marketplace, state: RootState) => {
  return (
    marketplaceData.updatedAt ===
      state.outdated.marketplaces[marketplaceData.id] ||
    (!marketplaceData.offchainData &&
      state.outdated.marketplaces[marketplaceData.id] === null)
  );
};

const transformResponse = (
  marketplaceData: Marketplace
): MarketplaceReducerState => {
  const commissionFee =
    marketplaceData.commissionFee &&
    marketplaceData.commissionFeeType === FeeType.Flat
      ? (
          parseInt(marketplaceData.commissionFee) / 1000000000000000000
        ).toString()
      : marketplaceData.commissionFee?.toString();
  const listingFee =
    marketplaceData.listingFee &&
    marketplaceData.listingFeeType === FeeType.Flat
      ? (parseInt(marketplaceData.listingFee) / 1000000000000000000).toString()
      : marketplaceData.listingFee?.toString();
  return {
    marketplace: { ...marketplaceData, commissionFee, listingFee },
  };
};

export const marketplaceApi = indexerApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarketplaceById: builder.query<
      MarketplaceReducerState,
      MarketplaceQueryParams
    >({
      queryFn: async (arg, api, _extraOptions, baseQuery) => {
        const fetch = async (): Promise<MarketplaceReducerState> => {
          const body = {
            body: gql`
                query Query {
                  marketplaceEntities (
                    first: 1,
                    filter: {
                      id: { equalTo: "${arg.id}" },
                    }
                  ){
                    nodes {
                      id
                      owner
                      kind
                      offchainData
                      createdAt
                      updatedAt
                      commissionFee
                      commissionFeeType
                      listingFee
                      listingFeeType
                      accountList
                    }
                  }
                }
          `,
          };
          const response = await baseQuery(body);
          const responseData = response.data as MarketplaceQueryResponse;
          const transformedResponse = transformResponse(
            responseData.marketplaceEntities.nodes[0]
          );
          const state = api.getState() as RootState;
          if (checkOutdatedData(transformedResponse.marketplace, state)) {
            await new Promise((r) => setTimeout(r, 5000));
            return await fetch();
          } else {
            return transformedResponse;
          }
        };
        const fetchResponse = await fetch();
        return { data: fetchResponse };
      },
    }),
    getMarketplacesByOwner: builder.query<
      MarketplacesReducerState,
      MarketplacesQueryParams
    >({
      query: ({ owner }) => ({
        body: gql`
                query Query {
                  marketplaceEntities (
                    filter: { 
                      and: [
                        {owner: { equalTo: "${owner}" }},
                      ]
                    }
                    orderBy: TIMESTAMP_CREATE_DESC
                  ){
                    nodes {
                      id
                      owner
                      kind
                      offchainData
                      createdAt
                      updatedAt
                      commissionFee
                      commissionFeeType
                      listingFee
                      listingFeeType
                      accountList
                    }
                  }
                }
              `,
      }),
      transformResponse: (response: MarketplaceQueryResponse) => ({
        marketplaces: response.marketplaceEntities.nodes,
      }),
    }),
  }),
});
