import { Network } from "../../../types";
import { IAddressMenuButton } from "../../molecules/AddressMenuButton/types";

export interface INavbar extends Omit<IAddressMenuButton, "onClickConnected"> {
  onClickAddress: () => void;
  onClickMyNfts: () => void;
  onClickLogout: () => void;
  isLoadingNetwork: boolean;
  currentNetwork: Network;
  onSelectNetwork: (network: Network) => void;
}
