import { UseFormReturn } from "react-hook-form";

export interface IMarketplaceConfigurationFormResult {
  marketplaceId: number;
  name: string;
  comissionFee?: number;
  listingFee?: number;
  logo: File;
}

export interface onSubmitParams {
  result: IMarketplaceConfigurationFormResult;
  formData: UseFormReturn<IMarketplaceConfigurationFormResult>;
}

export interface ISetMarketplaceConfigurationTemplate {
  onSubmit: (params: onSubmitParams) => void;
  disabled?: boolean;
}
