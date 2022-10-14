import { SerializedError } from "@reduxjs/toolkit";
import { NftJsonData } from "../../../types";

export type NtfState = {
  isLoading: boolean;
  error?: SerializedError;
};

export type NftsData = {
  [id: string]: {
    jsonData?: NftJsonData;
    state: NtfState;
  };
};
