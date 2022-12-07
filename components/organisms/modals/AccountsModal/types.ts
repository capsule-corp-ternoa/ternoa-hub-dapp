import { IModal } from "../../../atoms/Modal/types";

export interface IAccountsModal extends Omit<IModal, "children"> {
  accounts: string[];
  onChange: (accounts: string[]) => void;
}

export interface AccountInput {
  value: string;
  error?: string;
}
