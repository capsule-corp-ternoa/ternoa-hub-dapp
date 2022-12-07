import { IButtonToggle } from "./types";

const base: IButtonToggle<string> = {
  options: [
    {
      label: "Private",
      value: "private",
    },
    {
      label: "Public",
      value: "public",
    },
  ],
  onChange: console.log,
  selectedIndex: 0,
};

export const mockButtonToggleProps = {
  base,
};
