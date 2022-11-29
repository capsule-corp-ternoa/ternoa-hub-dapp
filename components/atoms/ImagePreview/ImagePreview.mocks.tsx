import NftLoader from "../NftLoader";
import { IImagePreview } from "./types";

const base: IImagePreview = {
  isLoading: false,
  src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
  alt: "NFT",
  loader: <NftLoader text="Loading" />,
};

export const mockImagePreviewProps = {
  base,
};
