import { IModal } from "../../../atoms/Modal/types";

export interface INftMintingModal extends Omit<IModal, "children"> {
  txId: string;
}
