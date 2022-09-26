import { IAlertModal } from "./types";

const base: IAlertModal = {
  isOpened: true,
  onClose: () => {},
  title: "This is an alert modal",
};

export const mockAlertModalProps = {
  base,
};
