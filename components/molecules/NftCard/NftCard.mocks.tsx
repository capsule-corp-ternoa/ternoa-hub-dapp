import { INftCard } from "./types";

const base: INftCard = {
  id: '0',
  preview: {
    src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
    alt: "NFT",
  },
  isLoading: false,
  creator: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF",
  name: "Nft Mock Name",
  isChecked: true,
};

export const mockNftCardProps = {
  base,
};
