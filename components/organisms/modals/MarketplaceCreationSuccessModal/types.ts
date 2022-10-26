import { IModal } from "../../../atoms/Modal/types";

export interface IMarketplaceCreationSuccessModal
  extends Omit<IModal, "children"> {
  marketplaceId: string;
  onClickSetMarketplaceConfiguration: () => void;
}
