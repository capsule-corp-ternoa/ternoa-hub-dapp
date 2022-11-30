import { IAddressMenuButton } from "../../molecules/AddressMenuButton/types";

export interface IMarketplaceNavbar
  extends Omit<IAddressMenuButton, "onClickConnected"> {
  onClickAddress: () => void;
  marketplaceName: string;
  marketplaceLogo: string;
  isEditVisible: boolean;
  onClickEdit: () => void;
  mainColor?: string;
}
