import React from "react";
import { IInput } from "./types";
import Icon from "../Icon";

const Input: React.FC<IInput> = ({
  placeholder,
  label,
  type = "primary",
  leftComponent,
  leftIcon,
  leftButtonLabel,
  leftComponentClassname = "",
  onPressLeftComponent,
  leftPadding = 30,
  rightIcon,
  rightComponent,
  rightButtonLabel,
  rightComponentClassname = "",
  rightPadding = 30,
  onPressRightComponent,
  ...props
}) => {
  
  const hasLeftComponent = Boolean(
    leftComponent || leftIcon || leftButtonLabel
  );
  const hasRightComponent = Boolean(
    rightComponent || rightIcon || rightButtonLabel
  );

  const renderButton = (label: string) => {
    return (
      <div className="bg-gray-800 border border-solid border-transparent rounded p-s4 flex justify-center items-center text-fs10 text-white-default cursor-pointer">
        {label}
      </div>
    );
  };

  const renderLeftComponent = () => {
    if (hasLeftComponent) {
      return (
        <div
          onClick={onPressLeftComponent}
          className={`absolute z-10 top-[23%] ${
            leftButtonLabel ? "left-s8" : "left-s16"
          } ${getBackgroundByType()} ${leftComponentClassname}`}
        >
          {leftComponent ||
            (leftIcon && <Icon name={leftIcon} size={24} />) ||
            (leftButtonLabel && renderButton(leftButtonLabel))}
        </div>
      );
    }
  };

  const renderRightComponent = () => {
    if (hasRightComponent) {
      return (
        <div
          onClick={onPressRightComponent}
          className={`absolute z-10 top-[23%] ${
            leftButtonLabel ? "right-s8" : "right-s16"
          } ${rightComponentClassname}`}
        >
          {rightComponent ||
            (rightIcon && <Icon name={rightIcon} size={24} />) ||
            (rightButtonLabel && renderButton(rightButtonLabel))}
        </div>
      );
    }
  };

  const parseDynamicStyles = () => {
    let styles: React.CSSProperties = {};
    if (hasLeftComponent) {
      styles.textIndent = leftPadding;
    }
    if (hasRightComponent) {
      styles.paddingRight = rightPadding;
    }
    return styles;
  };

  const getBackgroundByType = () => {
    switch (type) {
      case "primary":
      case "disabled": {
        return "bg-gray-50 group-hover:bg-gray-100";
      }
      case "error": {
        return "bg-red-100 group-hover:bg-red-100";
      }
    }
  };

  const getColorsClassesByType = () => {
    switch (type) {
      case "primary": {
        return `border-gray-300 focus:border-gray-400 text-gray-700 placeholder:text-gray-400 ${getBackgroundByType()}`;
      }
      case "error": {
        return `border-red-300 focus:border-red-400 text-red-300 placeholder:text-red-300 ${getBackgroundByType()}`;
      }
      case "error": {
        return `border-gray-300 focus:border-gray-400 text-gray-300 placeholder:text-gray-300 ${getBackgroundByType()}`;
      }
    }
  };

  return (
    <React.Fragment>
      {label && (
        <label
          htmlFor={props.id}
          className="inline-block	font-AirbnbCerealBold text-fs20 py-[10px] text-black-default"
        >
          {label}
          {props.required && (
            <span className="text-fs18 text-red-500">{` *`}</span>
          )}
        </label>
      )}
      <div className="group relative md:w-[504px] lg:w-[504px] xl:w-[504px] xs:w-full sm:w-full">
        <input
          {...props}
          style={parseDynamicStyles()}
          className={`w-full border-2 border-solid rounded-xl px-s16 py-[10px] text-fs18 font-AirbnbCerealMedium ${getColorsClassesByType()}`}
          placeholder={placeholder}
          disabled={type === "disabled"}
        />
        {hasRightComponent && renderRightComponent()}
        {hasLeftComponent && renderLeftComponent()}
      </div>
    </React.Fragment>
  );
};

export default Input;
