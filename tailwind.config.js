/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1535px",
    },
    fontFamily: {
      sans: ["Arial", "sans-serif"],
      serif: ["Garamond", "serif"],
      AirbnbCerealLight: ["AirbnbCerealLight"],
      AirbnbCerealMedium: ["AirbnbCerealMedium"],
      AirbnbCerealBold: ["AirbnbCerealBold"],
    },
    fontSize: {
      fs10: [
        ".625rem",
        {
          lineHeight: "0.81rem",
        },
      ],
      fs12: [
        ".75rem",
        {
          lineHeight: "0.97rem",
        },
      ],
      fs14: [
        ".875rem",
        {
          lineHeight: "1.14rem",
        },
      ],
      fs16: [
        "1rem",
        {
          lineHeight: "1.30rem",
        },
      ],
      fs18: [
        "1.125rem",
        {
          lineHeight: "1.47rem",
        },
      ],
      fs20: [
        "1.25rem",
        {
          lineHeight: "1.63rem",
        },
      ],
      fs24: [
        "1.5rem",
        {
          lineHeight: "1.95rem",
        },
      ],
      fs30: [
        "1.875rem",
        {
          lineHeight: "2.44rem",
        },
      ],
      fs36: [
        "2.25rem",
        {
          lineHeight: "3.05rem",
        },
      ],
      fs48: [
        "3rem",
        {
          lineHeight: "3.90rem",
        },
      ],
      fs64: [
        "4rem",
        {
          lineHeight: "4.69rem",
        },
      ],
      fs80: "5rem",
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    spacing: {
      s1: "1px",
      s2: "2px",
      s4: "4px",
      s8: "8px",
      s16: "16px",
      s20: "20px",
      s24: "24px",
      s28: "28px",
      s32: "32px",
      s40: "40px",
      s48: "48px",
      s56: "56px",
      s64: "64px",
      s136: "136px",
      s144: "144px",
      s176: "176px",
      s184: "184px",
      s240: "240px",
    },
    minWidth: {
      144: "144px",
      184: "184px",
      240: "240px",
    },
    extend: {
      display: ["group-hover"],
      colors: {
        black: {
          default: "#000000",
        },
        white: {
          default: "#FFFFFF",
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#FFFFFF",
          600: "#475569",
          700: "#334155",
          800: "#16161A",
          900: "#1E293B",
        },
        green: {
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
        },
        yellow: {
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
        },
        red: {
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#BC3748",
        },
        blue: {
          default: "#2454FF",
        },
      },
      gridTemplateColumns: {
        nftListDesktop: "repeat(auto-fill, minmax(290px,1fr))",
        nftList: "repeat(auto-fill, minmax(144px,1fr))",
        marketplaceNftListDesktop: "repeat(auto-fit, minmax(290px,1fr))",
        marketplaceNftList: "repeat(auto-fit, minmax(144px,1fr))",
        homeCardsDesktop: "repeat(auto-fill, minmax(302px,1fr))",
        homeCards: "repeat(auto-fill, minmax(100%,1fr))",
      },
    },
  },
  plugins: [],
};
