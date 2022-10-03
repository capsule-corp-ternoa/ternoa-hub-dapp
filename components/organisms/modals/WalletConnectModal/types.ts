import { IModal } from "../../../atoms/Modal/types";

export interface IWalletConnectModal extends Omit<IModal, "children"> {
  uri?: string;
}
