import { IIconModal } from "./types";

const base: IIconModal = {
  isOpened: true,
  onClose: () => {},
  title: "This is an alert modal",
};

export const mockIconModalProps = {
  base,
};
