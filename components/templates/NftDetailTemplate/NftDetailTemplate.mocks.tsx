import LoaderEllipsis from "../../atoms/LoaderEllipsis";
import { INftDetailTemplate } from "./types";

const base: INftDetailTemplate = {
  id: '0',
  name: 'My detailed NFT',
  nftImage: {
    src: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
    alt: "NFT",
    loader: <LoaderEllipsis></LoaderEllipsis>
  },
  creator: {
    pubKey: "5GYiVxT9SLvW8mUDPK3PorCYYRWtkw6XRNh7PLfxDPsSHLxF"
  },
  collectionName: "Uzuki long long",
  collectionLogo: "https://ipfs-dev.trnnfr.com/ipfs/QmQ1sD95jLSo1vJK6mcXHGogrph8Bqpgx7L8Vy4SX6Xbrg",
  quantity: '10',
  limit:'15',
  description: "Description mock for NFT Detail Template",
  displayButton: true,
  disabled: true,
  buttonText: "Not for sale",
  isSoulbound:false,
  isCapsule:true,
  isSecret:false,
  isDelegated:false,

};

export const mockNftDetailTemplateProps = {
  base,
};
