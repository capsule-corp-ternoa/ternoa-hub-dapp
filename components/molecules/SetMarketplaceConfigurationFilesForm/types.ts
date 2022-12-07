import { Control } from "react-hook-form";
import { IMarketplaceConfigurationFormResult } from "../../templates/SetMarketplaceConfigurationTemplate/types";

export interface ISetMarketplaceConfigFilesForm {
  onSelectLogo: (file: File) => void;
  logoValue?: File;
  logoRef?: React.Ref<HTMLInputElement>;
  className?: string;
  control?: Control<IMarketplaceConfigurationFormResult, any>;
  logoError?: string;
  isBackButtonHidden?: boolean;
}
