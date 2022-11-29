import { IAccountMarketplacesTemplate } from "./types";

const base: IAccountMarketplacesTemplate = {
  isLoading: false,
  onClickAddNew: () => {},
  marketplaces: [
    {
      isLoading: false,
      name: "TestHub",
      preview: {
        alt: "TestHub",
        src: "https://ipfs-dev.trnnfr.com/ipfs/QmcP4NFrJ1jUmJXeNHSumN1huwPBTdM4sFGZiwXMz3mxEw",
      },
    },
  ],
};

export const mockAccountMarketplacesTemplateProps = {
  base,
};
