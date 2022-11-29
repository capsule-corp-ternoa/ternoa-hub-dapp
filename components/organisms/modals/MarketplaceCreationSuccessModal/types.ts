import { IModal } from "../../../atoms/Modal/types";

export interface IMarketplaceCreationSuccessModal
  extends Omit<IModal, "children"> {
  onClickSetMarketplaceConfiguration: () => void;
}
