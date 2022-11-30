import React from "react";
import { INavbar } from "../../organisms/Navbar/types";

export interface IBaseTemplate {
  children: React.ReactNode | React.ReactNode[];
  renderCustomNavbar?: (props: INavbar) => React.ReactNode;
}
