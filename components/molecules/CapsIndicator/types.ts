import { TextFontWeightType } from "../../atoms/Avatar/types";

export interface ICapsIndicator {
  isConnected: boolean;
  onClickConnect: () => void;
  onClickDisconnect: () => void;
  isLoading?: boolean;
  isDisconnecting?: boolean;
  isLoadingCaps?: boolean;
  caps?: string;
  pubKey?: string;
  avatarTheme?: TextFontWeightType;
}
