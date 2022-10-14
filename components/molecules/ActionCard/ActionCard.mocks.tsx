import { IActionCard } from "./types";

const base: IActionCard = {
  imgProps: { src: "./nft-frame.svg", alt: "Create NFTs", width: 97, height: 148 },
  title: "Basic NFTs",
  body: "Allows you to create a unique NFT",
  action: "Create NFTs",
  onClickAction: () => {},
};

export const mockActionCardProps = {
  base,
};
