import { ImageProps } from "next/image";
import { ICard } from "../../atoms/Card/types";

export interface IActionCard {
  imgProps: ImageProps;
  title: string;
  body?: string;
  action: string;
  onClickAction: () => void;
  className?: string;
}
