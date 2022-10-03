import axios from "axios";
import { NftJsonData } from "../types";

export interface IpfsUploadFileResponse {
  Hash: string;
  Name: string;
  Size: string;
}

export const uploadFile = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.request<IpfsUploadFileResponse>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_BASE_URL}/api/v0/add`,
    data: formData,
    headers: {
      apikey: process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_KEY || "",
    },
  });
  return response.data;
};