import { INftPreview } from "../../atoms/NftPreview/types";

export interface INftCard {
  preview?: Omit<INftPreview, "isLoading">;
  isLoading?: boolean;
  creator?: string;
  name?: string;
  className?: string;
}
