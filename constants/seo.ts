import { DefaultSeoProps } from "next-seo";

const defaultDescription =
  "Unlock the potential of the NFT market without any coding knowledge. Ternoa HUB is designed specifically for creators and entrepreneurs looking to enter the world of non-fungible tokens. Easily create, manage, and sell your own NFTs with our intuitive interface and start building your digital asset empire today.";

const SEO: DefaultSeoProps = {
  titleTemplate: "Ternoa HUB • %s",
  defaultTitle: "Ternoa HUB",
  description: defaultDescription,
  canonical: "https://hub.ternoa.network/",
  openGraph: {
    description: defaultDescription,
    type: "website",
    locale: "en_IE",
    siteName: "Ternoa HUB",
    images: [
      {
        url: "https://hub.ternoa.network/logo.png",
        width: 200,
        height: 200,
        alt: "Ternoa HUB",
        type: "image/png",
      },
    ],
  },
};

export default SEO;
