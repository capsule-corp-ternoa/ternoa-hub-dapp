import { BaseQueryFn, createApi, retry } from "@reduxjs/toolkit/query/react";
import { request, ClientError } from "graphql-request";
import { RootState } from "..";

const graphqlBaseQuery: BaseQueryFn<{ body: string }, unknown> = async (
  { body },
  api
) => {
  try {
    const state = api.getState() as RootState;
    const currentNetwork = state.blockchain.currentNetwork;
    const indexerUrl = currentNetwork.indexerUrl;
    if (!indexerUrl) {
      throw Error("INDEXER URL NOT DEFINED");
    }
    const result = await request(indexerUrl, body);
    return { data: result };
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } };
    }
    return { error: { status: 500, data: error } };
  }
};

export const indexerApi = createApi({
  reducerPath: "indexer",
  baseQuery: retry(graphqlBaseQuery, { maxRetries: 3 }),
  endpoints: () => ({}),
  tagTypes: ["Nfts"],
});
