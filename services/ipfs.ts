import axios from "axios";
import * as networks from "../constants/network";
import { IpfsUploadFileResponse } from "../pages/api/ipfs";
import { InvalidNetworkName, IpfsServiceData, Network } from "../types";

export const uploadFile = async (file: string | Blob, network: Network) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("networkName", network.name);
  const response = await axios.request<IpfsUploadFileResponse>({
    method: "POST",
    url: `/api/ipfs`,
    data: formData
  });
  return response.data;
};

export const getIpfsRequestData = (networkName: string): IpfsServiceData => {
  if (networkName === networks.ALPHANET_NETWORK.name) {
    return {
      url: networks.ALPHANET_NETWORK.ipfsUrl,
      key: process.env.ALPHANET_IPFS_GATEWAY_KEY || "",
    };
  }
  if (networkName === networks.MAINNET_NETWORK.name) {
    return {
      url: networks.MAINNET_NETWORK.ipfsUrl,
      key: process.env.MAINNET_IPFS_GATEWAY_KEY || "",
    };
  }
  throw new InvalidNetworkName("Invalid network");
};
