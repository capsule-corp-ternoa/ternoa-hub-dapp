import * as NextImage from "next/image";
import "../styles/globals.css";
import "../components/atoms/Switch/styles.css";
import "../components/atoms/LoaderEllipsis/styles.css";
import "./styles.css";

const BREAKPOINT_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINT_INT).map(([key, val], idx) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  grid: {
    gridOn: false,
    columns: 12,
    gap: "20px",
    gutter: "50px",
    maxWidth: "1024px",
  },
  viewport: { viewports: customViewports },
  backgrounds: {
    default: "ternoart",
    values: [
      {
        name: "ternoart",
        value: "#F1F5F9",
      },
      {
        name: "white",
        value: "#FFFFFF",
      },
    ],
  },
};
