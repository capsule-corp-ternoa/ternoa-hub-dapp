import { UseFormReturn } from "react-hook-form";
import { IImagePreview } from "../../atoms/ImagePreview/types";
import { IUserAddressBlock } from "../../molecules/UserAddressBlock/types";

export interface INftFormResult {
  nft_id: string;
  recipient:IUserAddressBlock;
}

export interface onSubmitParams {
  result: INftFormResult;
  formData: UseFormReturn<INftFormResult>;
}

export interface IRentNftTemplate {
  onSubmit: (params: onSubmitParams) => void;
  nftImage: IImagePreview;
  id:string;
  disabled?: boolean;
  noTitle?: boolean
  noQuantity?: boolean;
  hasBackBtn?:boolean;
  isDelegated?:boolean;
  action:'delegate' | 'rent';
}