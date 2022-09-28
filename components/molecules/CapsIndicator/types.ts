import { TextFontWeightType } from "../../atoms/Avatar/types";

export interface ICapsIndicator {
  isConnected: boolean;
  onClickConnect: () => void;
  onClickConnected: () => void;
  isLoading?: boolean;
  isLoadingCaps?: boolean;
  caps?: string;
  pubKey?: string;
  avatarTheme?: TextFontWeightType;
}
