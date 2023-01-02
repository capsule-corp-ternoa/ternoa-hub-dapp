import { UseFormReturn } from "react-hook-form";

export interface IMarketplaceFormResult {
  isPrivate: boolean;
}

export interface onSubmitParams {
  result: IMarketplaceFormResult;
}

export interface ICreateMarketplaceTemplate {
  onSubmit: (params: onSubmitParams) => void;
  disabled?: boolean;
  serviceFee?: string;
}
