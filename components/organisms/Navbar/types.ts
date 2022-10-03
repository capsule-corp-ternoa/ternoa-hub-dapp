import { ICapsIndicator } from "../../molecules/CapsIndicator/types";

export interface INavbar extends Omit<ICapsIndicator, "onClickConnected"> {
  onClickAddress: () => void;
  onClickMyNfts: () => void;
  onClickLogout: () => void;
}
