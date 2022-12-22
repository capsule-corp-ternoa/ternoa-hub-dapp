import { ISetNftPriceModal } from "./types";

const base: ISetNftPriceModal = {
  isOpened: true,
  onClose: () => {},
  onSubmit: () => {},
};

export const mockSetNftPriceModalProps = {
  base,
};
