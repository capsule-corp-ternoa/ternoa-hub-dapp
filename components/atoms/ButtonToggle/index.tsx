import { IButtonToggle } from "./types";

const ButtonToggle = <T extends unknown>({
  options,
  onChange,
  selectedIndex,
  className = "",
  optionClassName = "",
}: IButtonToggle<T>) => {
  const selectedClasses = "bg-gray-700 text-white-default opacity-100";

  return (
    <div
      className={`bg-gray-50 border-solid border-2 border-gray-200 rounded-lg w-fit p-s8 flex flex-row ${className}`}
    >
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        return (
          <div
            onClick={() => onChange(option.value, index)}
            key={index}
            className={`md:py-[12px] py-[10px] rounded-lg min-w-[120px] text-center cursor-pointer ${optionClassName} ${
              isSelected
                ? selectedClasses
                : "transparent text-gray-800 opacity-60"
            }`}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonToggle;
