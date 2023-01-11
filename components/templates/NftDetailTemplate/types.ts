import { IImagePreview } from "../../atoms/ImagePreview/types";
import { INftCard } from "../../molecules/NftCard/types";
import { IUserAddressBlock } from "../../molecules/UserAddressBlock/types";

export interface INftDetailTemplate {
  nftImage: IImagePreview;
  id:number;
  name: string;
  description: string
  quantity: number;
  collectionName?: string;
  collectionLogo?: IImagePreview;
  creator: IUserAddressBlock;
  displayButton:boolean;
  onClick?: () => void;
  buttonText?:string;
  disabled?:boolean;
}
