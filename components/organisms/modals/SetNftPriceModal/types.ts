import { UseFormReturn } from "react-hook-form";
import { IModal } from "../../../atoms/Modal/types";

export interface ISetNftPriceModal extends Omit<IModal, "children"> {
  onSubmit: (params: onSubmitParams) => void;
  exchangeRate?: number;
  isLoadingExchangeRate?: boolean;
  mainColor?: string;
}

export interface onSubmitParams {
  result: ISetNFTPriceFormResult;
  formData: UseFormReturn<ISetNFTPriceFormResult>;
}

export interface ISetNFTPriceFormResult {
  price: string;
}
