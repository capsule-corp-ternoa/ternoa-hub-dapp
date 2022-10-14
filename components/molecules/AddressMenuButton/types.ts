import { TextFontWeightType } from "../../atoms/Avatar/types";

export interface IAddressMenuButton {
  isConnected: boolean;
  onClickConnect: () => void;
  onClickConnected: () => void;
  isLoading?: boolean;
  pubKey?: string;
  className?: string;
  disabled?: boolean;
}
