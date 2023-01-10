import { TextFontWeightType } from "../../atoms/Avatar/types";
import { IconNamesType, IconSizeType } from "../../atoms/Icon/types";

export interface IUserAddressBlock {
  onClick?: () => void;
  pubKey: string;
  icon?:IconNamesType;
  iconSize?:IconSizeType;
  iconColor?:string;
  }
