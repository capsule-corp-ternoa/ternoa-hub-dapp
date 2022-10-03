import { IWalletConnectModal } from "./types";

const base: IWalletConnectModal = {
  isOpened: true,
  onClose: () => {},
  uri: 'test'
};

export const mockWalletConnectModalProps = {
  base,
};
