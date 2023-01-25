import { IImagePreview } from "../../atoms/ImagePreview/types";
import { INftCard } from "../../molecules/NftCard/types";
import { IUserAddressBlock } from "../../molecules/UserAddressBlock/types";

export interface INftDetailTemplate {
  nftImage: IImagePreview;
  id:string;
  name: string;
  description: string
  quantity?: string;
  limit?: string;
  collectionName?: string;
  collectionLogo?: string;
  creator: IUserAddressBlock;
  displayButton:boolean;
  onClick?: () => void;
  buttonText?:string;
  disabled?:boolean;
  isSoulBound:boolean;
  isCapsule:boolean;
  isSecret:boolean;
  
}
