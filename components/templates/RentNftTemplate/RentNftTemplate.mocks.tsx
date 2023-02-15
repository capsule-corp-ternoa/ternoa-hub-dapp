import LoaderEllipsis from "../../atoms/LoaderEllipsis";
import { IRentNftTemplate } from "./types";

const base: IRentNftTemplate = {
  onSubmit: () => {},
  action:'delegate',
  id: '0',
  nftImage: {
    src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
    alt: "NFT",
    loader: <LoaderEllipsis></LoaderEllipsis>
  },
};

export const mockRentNftTemplateProps = {
  base,
};
