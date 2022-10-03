import Text from "../Text";
import { IFilter } from "./types";

const Filter: React.FC<IFilter> = ({
  name,
  quantity,
  isSelected = false,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer inline-block w-auto">
      <Text
        text={`${name} ${quantity ? `· ${quantity}` : ""}`}
        weight={"medium"}
        type="p3"
        color={isSelected ? "text-black-default" : "text-gray-400"}
        className={`pb-[12px] md:pb-s16 ${
          isSelected ? "border-b-2 border-black-default border-solid" : ""
        }`}
      />
    </div>
  );
};

export default Filter;
