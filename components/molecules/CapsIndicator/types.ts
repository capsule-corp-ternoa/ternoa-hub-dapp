import { TextFontWeightType } from "../../atoms/Avatar/types";

export interface ICapsIndicator {
  isConnected: boolean;
  onClickConnect: () => void;
  isLoading?: boolean;
  isLoadingCaps?: boolean;
  caps?: string;
  pubKey?: string;
  avatarTheme?: TextFontWeightType;
}
