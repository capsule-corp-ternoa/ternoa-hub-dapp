import React from "react";
import { IGridWarapper } from "./types";

const GridWrapper: React.FC<IGridWarapper> = ({ children, className = "" }) => {
  return (
    <div className={`w-[92vw] sm:w-[92vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] ${className}`}>
      {children}
    </div>
  );
};

export default GridWrapper;
