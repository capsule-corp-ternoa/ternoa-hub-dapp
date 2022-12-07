import { IImagePreview } from "../../atoms/ImagePreview/types";

export interface IMarketplaceListItem {
  isLoading: boolean;
  name?: string;
  className?: string;
  preview?: Omit<IImagePreview, "isLoading" | "loader">;
  onClickManage?: () => void;
  onClickPreview?: () => void;
}
