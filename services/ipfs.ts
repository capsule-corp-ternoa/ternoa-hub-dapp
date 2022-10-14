import axios from "axios";
import { Network } from "../types";

export interface IpfsUploadFileResponse {
  Hash: string;
  Name: string;
  Size: string;
}

export const uploadFile = async (file: string | Blob, network: Network) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.request<IpfsUploadFileResponse>({
    method: "POST",
    url: `${network.ipfsUrl}/api/v0/add`,
    data: formData,
    headers: {
      apikey: network.ipfsKey || "",
    },
  });
  return response.data;
};
