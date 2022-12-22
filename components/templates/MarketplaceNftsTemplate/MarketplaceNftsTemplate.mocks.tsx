import { IMarketplaceNftsTemplate } from "./types";

const base: IMarketplaceNftsTemplate = {
  onClickCreateNft: () => {},
  onEndReached: () => {},
  isCreateNftVisible: true,
  nfts: [
    {
      id: "0",
      isLoading: false,
      preview: {
        src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
        alt: "NFT",
      },
      creator: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF",
      name: "Nft Mock Name",
    },
    {
      id: "1",
      isLoading: false,
      preview: {
        src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
        alt: "NFT",
      },
      creator: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF",
      name: "Nft Mock Name 2",
    },
    {
      id: "2",
      isLoading: false,
      preview: {
        src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
        alt: "NFT",
      },
      creator: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF",
      name: "Nft Mock Name 3",
    },
    {
      id: "3",
      isLoading: false,
      creator: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF",
    },
    {
      id: "4",
      isLoading: false,
      preview: {
        src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
        alt: "NFT",
      },
      creator: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF",
      name: "Nft Mock Name 5",
    },
  ],
};

export const mockMarketplaceNftsTemplateProps = {
  base,
};
