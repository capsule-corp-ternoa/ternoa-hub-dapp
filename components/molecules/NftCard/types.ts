import { IImagePreview } from "../../atoms/ImagePreview/types";

export interface INftCard {
  id: string;
  preview?: Omit<IImagePreview, "isLoading" | "loader">;
  isLoading?: boolean;
  creator?: string;
  name?: string;
  className?: string;
  onChangeChecked?: (isChecked: boolean) => void;
  isChecked?: boolean;
  price?: string;
  showPrice?: boolean;
}
