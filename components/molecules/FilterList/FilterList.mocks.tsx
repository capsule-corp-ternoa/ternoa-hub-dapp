import { IFilterList } from "./types";

const base: IFilterList = {
  filters: [
    {
      name: "MyFilter",
      quantity: 9,
    },
    {
      name: "SelectedFilter",
      quantity: 3,
    },
  ],
  onSelectFilter: () => {},
  selectedIndex: 1,
};

export const mockFilterListProps = {
  base,
};
