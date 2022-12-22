import Text from "../../atoms/Text";
import { IFloatingAction } from "./types";

const FloatingAction: React.FC<IFloatingAction> = ({
  text,
  buttonText,
  onClickAction,
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-600 rounded-xl flex flex-row justify-center items-center w-max p-[12px] ${className}`}
    >
      {text && (
        <Text
          type="p3"
          weight="light"
          color="text-gray-500"
          className="mr-s8"
          text={text}
        />
      )}
      <div
        className="bg-[#BC3748] p-s8 rounded-lg cursor-pointer"
        onClick={onClickAction}
      >
        <Text
          type="p3"
          weight="medium"
          color="text-gray-500"
          text={buttonText}
        />
      </div>
    </div>
  );
};

export default FloatingAction;
