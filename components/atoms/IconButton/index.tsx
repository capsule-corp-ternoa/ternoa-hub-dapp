import { TButtonSize, IButton, TButtonType } from "./types";
import Text from "../Text";
import { IText } from "../Text/types";
import Icon from "../Icon";

const getButtonSize = (size: TButtonSize) => {
  switch (size) {
    case "large":
      return "md:min-w-240 lg:min-w-240 xl:min-w-240 h-s56 px-s56";
    case "medium":
      return "md:min-w-184 lg:min-w-184 xl:min-w-184 h-s48 px-s46";
    case "small":
      return "md:min-w-144 lg:min-w-144 xl:min-w-144 h-s40 px-s36";
      case "xsmall":
        return "md:min-w-70 lg:min-w-70 xl:min-w-70 h-s40 px-s16"
  }
};

const getButtonType = (type: TButtonType, disabled: boolean) => {
  switch (type) {
    case "primary":
      return !disabled
        ? "bg-gray-800 hover:bg-gray-900 hover:shadow-xl focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transition duration-150 ease-in-out"
        : "bg-gray-200";
    case "secondary":
      return !disabled
        ? "bg-white-default border-2 border-gray-800 hover:bg-gray-100 hover:border-gray-900 hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:border-gray-100 active:shadow-lg transition duration-150 ease-in-out"
        : "bg-gray-200";
    case "tertiary":
      return "!shadow-none bg-gray-100 hover:bg-gray-50 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 active:shadow-lg ease-in-out";
    case "danger":
      return "bg-red-200 hover:border-2 hover:border-red-300 hover:shadow-lg hover:shadow-red-200 focus:shadow-lg focus:outline-none focus:ring-0 active:border-red-300 active:shadow-lg transition duration-150 ease-in-out";
  }
};

const getTextProps = (
  type: TButtonType,
  size: TButtonSize,
  text: string,
  disabled: boolean
): IText => {
  const textType = size === "large" ? "p1" : "p3";

  switch (type) {
    case "primary":
      return {
        text,
        type: textType,
        weight: "medium",
        color: disabled ? "gray-400" : "white-default",
      };
    case "secondary":
      return {
        text,
        type: textType,
        weight: "medium",
        color: disabled ? "gray-400" : "gray-800",
      };
    case "tertiary":
      return {
        text,
        type: textType,
        weight: "medium",
        color: "gray-700",
      };
    case "danger":
      return { text, type: textType, weight: "medium", color: "red-400" };
  }
};

const IconButton: React.FC<IButton> = ({
  text,
  icon,
  iconSize = 24,
  iconColor,
  size,
  reversed = false,
  type,
  disabled = false,
  className = "",
  autoWidth,
  leftComponent,
  color,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      disabled={disabled}
      className={`flex flex-row items-center justify-center inline-block xs:min-w-[100%] sm:min-w-[100%] ${getButtonSize(
        size
      )} ${getButtonType(
        type,
        disabled
      )} text-center whitespace-nowrap leading-tight rounded-lg shadow-md cursor-pointer ${
        autoWidth && "!min-w-[auto]"
      } ${className}`}
    >
      {!reversed && (
        <Icon name={icon} size={iconSize} color={iconColor}  className="md:mr-s8 sm:mr-s8 lg:mr-s8" />
      )}
      <Text {...getTextProps(type, size, text, disabled)} />
      {reversed && <Icon name={icon} size={iconSize} color={iconColor} className="md:ml-s8 sm:ml-s8 lg:ml-s8"/>}
    </button>
  );
};

export default IconButton;
