import { IAddNftToMarketplaceModal } from "./types";

const base: IAddNftToMarketplaceModal = {
  isOpened: true,
  onClickImport: () => {},
  onClickCreate: () => {},
  onClose: () => {},
};

export const mockAddNftToMarketplaceModalProps = {
  base,
};
