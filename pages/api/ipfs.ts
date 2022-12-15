import axios, { AxiosError } from "axios";
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import type { NextApiRequest, NextApiResponse } from "next";
import { getIpfsRequestData } from "../../services/ipfs";

export interface IpfsUploadFileResponse {
  Hash: string;
  Name: string;
  Size: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const ipfsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data: { fields: { networkName: string }; files: { file: any } } =
        await new Promise((resolve, reject) => {
          const form = new formidable.IncomingForm();
          form.parse(req, (err: any, fields: any, files: any) => {
            if (err) reject({ err });
            resolve({ fields, files });
          });
        });
      const formData = new FormData();
      formData.append("file", fs.createReadStream(data.files["file"].filepath));
      const ipfsRequestData = getIpfsRequestData(data.fields["networkName"]);
      const response = await axios.request<IpfsUploadFileResponse>({
        method: "POST",
        transformRequest: () => {
          return formData;
        },
        url: `${ipfsRequestData.url}/api/v0/add`,
        data: formData,
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          apikey: ipfsRequestData.key,
        },
      });
      res.status(200).send(response.data);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        res
          .status(err.response?.status || 500)
          .send(err.response || "There was an error trying to upload to IPFS");
      } else {
        res.status(500).send(err);
      }
    }
  }
};

export default ipfsApi;
