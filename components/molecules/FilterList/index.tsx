import Filter from "../../atoms/Filter";
import { IFilterList } from "./types";

const FilterList: React.FC<IFilterList> = ({
  filters,
  onSelectFilter,
  selectedIndex,
  containerClassName = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className={`flex flex-row ${className}`}>
        {filters.map((filter, i) => (
          <div
            className={i !== filters.length - 1 ? "mr-s16 md:mr-s32" : ""}
            key={i}
          >
            <Filter
              {...filter}
              isSelected={selectedIndex === i}
              onClick={() => onSelectFilter(i)}
            />
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 border-solid pb-[12px] md:pb-s16" />
    </div>
  );
};

export default FilterList;
