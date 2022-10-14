import { IFilter } from "../../atoms/Filter/types";

export interface IFilterList {
  filters: IFilter[];
  onSelectFilter: (index: number) => void;
  selectedIndex: number;
  containerClassName?: string;
  className?: string;
}
