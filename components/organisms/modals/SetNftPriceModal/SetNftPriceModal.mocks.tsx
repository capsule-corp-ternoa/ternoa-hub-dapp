import { ISetNftPriceModal } from "./types";

const base: ISetNftPriceModal = {
  isOpened: true,
  onClose: () => {},
  onSubmit: () => {},
  isLoadingExchangeRate: false,
  exchangeRate: 0.007013280353,
};

export const mockSetNftPriceModalProps = {
  base,
};
