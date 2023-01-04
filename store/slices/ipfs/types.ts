import { SerializedError } from "@reduxjs/toolkit";
import { IpfsUploadFileResponse } from "../../../pages/api/ipfs";
import { LoadingState } from "../../../types";

export type IpfsStatus = {
  loadingState: LoadingState;
  error?: SerializedError;
};

export type IpfsData = {
  data?: IpfsUploadFileResponse;
  status: IpfsStatus;
};
