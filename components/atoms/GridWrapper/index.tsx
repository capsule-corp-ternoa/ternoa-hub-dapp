import React from "react";
import { IGridWarapper } from "./types";

const GridWrapper: React.FC<IGridWarapper> = ({ children, className = "" }) => {
  return (
    <div className={`w-[73vw] sm:w-[83vw] md:w-[89vw] lg:w-[77vw] xl:w-[58vw] ${className}`}>
      {children}
    </div>
  );
};

export default GridWrapper;
