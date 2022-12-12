import { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
  titleTemplate: "Ternoa HUB • %s",
  defaultTitle: "Ternoa HUB",
  description: "We help creators make their ideas come to life",
  canonical: "https://hub.ternoa.network/",
  openGraph: {
    description: "We help creators make their ideas come to life",
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
