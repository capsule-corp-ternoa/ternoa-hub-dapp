import { IModal } from "./types";

const base: IModal = {
  isOpened: true,
  children: <div className="w-[200px] h-[200px]">Test</div>,
};

export const mockModalProps = {
  base,
};
