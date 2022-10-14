import { ITxModal } from "./types";

const base: ITxModal = {
  isOpened: true,
  txId: "908908908a9sd89sd890sa8d90s89",
  title: "Minting request sent!",
  body: "An NFT minting proposal has been sent to your Ternoa Wallet App",
};

export const mockTxModalProps = {
  base,
};
