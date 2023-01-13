import NftLoader from "../../../atoms/NftLoader";
import { IZoomModal } from "./types";

const base: IZoomModal = {
  isOpened: true,
  imageSrc:"https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
  imageAlt:"zoomedImg",
  loader: <NftLoader text="Loading" />,
};

export const mockZoomModalProps = {
  base,
};
