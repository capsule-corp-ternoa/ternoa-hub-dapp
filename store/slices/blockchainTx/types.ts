import { AsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { BlockchainEvent } from "ternoa-js";
import { LoadingState, TxType } from "../../../types";

export type BlockchainTxStatus = {
  creatingState: LoadingState;
  creatingError?: SerializedError;
  submitState: LoadingState;
  submitError?: SerializedError;
};

export type BlockchainTxData = {
  hash?: `0x${string}`;
  data?: BlockchainEvent;
  txType?: TxType;
  status: BlockchainTxStatus;
};

type GenericAsyncThunk = AsyncThunk<`0x${string}`, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
