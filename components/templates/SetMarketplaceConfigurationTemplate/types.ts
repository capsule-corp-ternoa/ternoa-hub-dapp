import { UseFormReturn } from "react-hook-form";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";
import { Marketplace } from "../../../store/slices/marketplaces/types";
import { FeeType, MarketplaceJsonData } from "../../../types";

export interface IMarketplaceConfigurationFormResult {
  marketplaceId: number;
  name: string;
  commissionFee?: string;
  commissionFeeType?: FeeType;
  listingFee?: string;
  listingFeeType?: FeeType;
  logo: File;
  accounts?: string[];
  mainColor?: string;
}

export interface onSubmitParams {
  result: IMarketplaceConfigurationFormResult;
  formData: UseFormReturn<IMarketplaceConfigurationFormResult>;
}

export interface ISetMarketplaceConfigurationTemplate {
  onSubmit: (params: onSubmitParams) => void;
  disabled?: boolean;
  defaultMarketplaceId?: number;
  defaultKind?: MarketplaceKind;
  data?: Marketplace;
  ipfsData?: MarketplaceJsonData;
  logo?: File;
}
