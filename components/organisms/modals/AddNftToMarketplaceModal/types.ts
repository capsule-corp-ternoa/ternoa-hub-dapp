import { IModal } from "../../../atoms/Modal/types";

export interface IAddNftToMarketplaceModal extends Omit<IModal, "children"> {
  onClickImport: () => void;
  onClickCreate: () => void;
}
