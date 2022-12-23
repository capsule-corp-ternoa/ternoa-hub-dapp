import { UseFormReturn } from "react-hook-form";
import { IModal } from "../../../atoms/Modal/types";

export interface ISetNftPriceModal extends Omit<IModal, "children"> {
  onSubmit: (params: onSubmitParams) => void;
}

export interface onSubmitParams {
  result: ISetNFTPriceFormResult;
  formData: UseFormReturn<ISetNFTPriceFormResult>;
}

export interface ISetNFTPriceFormResult {
  price: string;
}
