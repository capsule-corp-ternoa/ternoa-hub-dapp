import { IImagePreview } from "../../atoms/ImagePreview/types";

export interface INftCard {
  preview?: Omit<IImagePreview, "isLoading" | "loader">;
  isLoading?: boolean;
  creator?: string;
  name?: string;
  className?: string;
}
