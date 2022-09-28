import { BaseQueryFn, createApi, retry } from "@reduxjs/toolkit/query/react";
import { request, ClientError } from "graphql-request";

const graphqlBaseQuery: BaseQueryFn<{ body: string }, unknown> = async (
  { body },
  api
) => {
  try {
    const indexerUrl = process.env.NEXT_PUBLIC_INDEXER_URL;
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
