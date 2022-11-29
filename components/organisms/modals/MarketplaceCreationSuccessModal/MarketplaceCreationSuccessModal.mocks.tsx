import { IMarketplaceCreationSuccessModal } from "./types";

const base: IMarketplaceCreationSuccessModal = {
  isOpened: true,
  onClickSetMarketplaceConfiguration: () => {},
  onClose: () => {},
};

export const mockMarketplaceCreationSuccessModalProps = {
  base,
};
