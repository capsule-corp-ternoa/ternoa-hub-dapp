import { IModal } from "../../../atoms/Modal/types";

export interface ITxModal extends Omit<IModal, "children"> {
  title: string;
  body?: string;
  txId: string;
}
