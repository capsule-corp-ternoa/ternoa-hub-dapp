import { gql } from "graphql-request";
import { indexerApi } from "../../services/indexerApi";
import type {
  NftByMarketplaceQueryParams,
  NftDetailQueryParams,
  NftDetailQueryResponse,
  NftDetailReducerState,
  NftQueryParams,
  NftQueryResponse,
  NftReducerState,
} from "./types";
import { Filter } from "./types";

const getQueryFilter = (filter: Filter, value: string) => {
  switch (filter) {
    case Filter.Owned:
      return `{owner: { equalTo: "${value}" }},`;
    case Filter.Created:
      return `{creator: { equalTo: "${value}" }},`;
    case Filter["On Sale"]:
      return `{or: [ {owner: { equalTo: "${value}" }}, {creator: {equalTo: "${value}"}}]}, {isListed: {equalTo: true}}`;
    case Filter["Not Listed"]:
      return `{owner: { equalTo: "${value}" }}, {isListed: {equalTo: false}}`;
    default:
      return ``;
  }
};

export const nftApi = indexerApi.injectEndpoints({
  endpoints: (builder) => ({
    getNftsByAddress: builder.query<NftReducerState, NftQueryParams>({
      query: ({ address, pagination, filter }) => ({
        body: gql`
                query Query {
                  nftEntities (
                    first: ${pagination.first},
                    offset: ${pagination.offset}, 
                    filter: { 
                      and: [
                        ${getQueryFilter(filter, address)} 
                        { timestampBurn:{isNull:true} }
                      ]
                    }
                    orderBy: TIMESTAMP_CREATE_DESC
                  ){
                    pageInfo {
                      hasNextPage
                    }
                    nodes {
                      nodeId
                      id
                      price
                      offchainData
                      owner
                      creator
                    }
                    totalCount
                  }
                }
              `,
      }),
      providesTags: ["Nfts"],
      transformResponse: (response: NftQueryResponse) => ({
        nfts: response.nftEntities.nodes,
        hasNextPage: response.nftEntities.pageInfo.hasNextPage,
      }),
    }),
    getNftById: builder.query<NftDetailReducerState, NftDetailQueryParams>({
      query: ({ nftId }) => ({
        body: gql`
        query Query {
          nftEntity(id:"${nftId}"),
          {
            id,
            nodeId,
            nftId,
            collectionId,
            owner,
            creator, 
            offchainData, 
            royalty, 
            mintFee, 
            isCapsule, 
            isSecret, 
            isSoulbound, 
            isListed,  
            price 
            collection 
              {
                nodeId,
                id,
                collectionId,
                owner,
                offchainData,
                nbNfts,
                limit,
              }, 
            }
         }
         `,
      }),
      providesTags: ["Nfts"],
      transformResponse: (response: NftDetailQueryResponse) => ({
        nftDetail: response.nftEntity
      }),
    }),

    getNftsByMarketplace: builder.query<
      NftReducerState,
      NftByMarketplaceQueryParams
    >({
      query: ({ marketplaceId, pagination }) => ({
        body: gql`
        query Query {
          nftEntities (
            first: ${pagination.first},
            offset: ${pagination.offset}, 
            filter: { 
              and: [
                { marketplaceId: {equalTo: "${marketplaceId}"} },
                { timestampBurn:{isNull:true} }
              ]
            }
            orderBy: TIMESTAMP_CREATE_DESC
          ){
            pageInfo {
              hasNextPage
            }
            nodes {
              nodeId
              id
              price
              offchainData
              owner
              creator
            }
            totalCount
          }
        }
      `,
      }),
      transformResponse: (response: NftQueryResponse) => ({
        nfts: response.nftEntities.nodes,
        hasNextPage: response.nftEntities.pageInfo.hasNextPage,
      }),
    }),
  }),
});
