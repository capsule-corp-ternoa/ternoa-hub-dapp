import { IMarketplaceCreationSuccessModal } from "./types";

const base: IMarketplaceCreationSuccessModal = {
  isOpened: true,
  onClickSetMarketplaceConfiguration: () => {},
  onClose: () => {},
  marketplaceId: "13",
};

export const mockMarketplaceCreationSuccessModalProps = {
  base,
};
