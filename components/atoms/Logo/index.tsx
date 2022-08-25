import React from "react";
import Image from "next/image";
import { ILogo } from "./types";

const Logo: React.FC<ILogo> = ({ width, height, className = "" }) => {
  const parseDynamicStyles = () => {
    let styles: React.CSSProperties = {};
    if (width) {
      styles.width = width;
    }
    if (height) {
      styles.height = height;
    }
    return styles;
  };

  return (
    <div
      className={`w-s24 h-s24 md:w-s40 md:h-s40 relative ${className}`}
      style={parseDynamicStyles()}
    >
      <Image src="/logo.svg" alt="Ternoart Logo" layout="fill" />
    </div>
  );
};

export default Logo;
