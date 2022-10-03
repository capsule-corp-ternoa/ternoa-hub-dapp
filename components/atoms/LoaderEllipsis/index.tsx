import React from "react";
import { ILoaderEllipsis } from "./types";

const LoaderEllipsis: React.FC<ILoaderEllipsis> = ({
  width,
  height,
  className = "",
}) => {
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
      className={`w-[80px] h-[80px] md:w-[110px] md:h-[110px] relative ${className}`}
      style={parseDynamicStyles()}
    >
      <object
        type="image/svg+xml"
        data="/loaderEllipsis.svg"
        className="objectLoader"
      />
    </div>
  );
};

export default LoaderEllipsis;
