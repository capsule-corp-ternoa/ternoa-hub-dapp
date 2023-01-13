import { IModal } from "../../../atoms/Modal/types";

export interface IZoomModal extends Omit<IModal, "children"> {
  imageSrc: string;
  imageAlt: string;
  loader: React.ReactNode | React.ReactNode[];
}
