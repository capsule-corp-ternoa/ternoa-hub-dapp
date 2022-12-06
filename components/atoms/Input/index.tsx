import React from "react";
import { IInput, TInputType } from "./types";
import Icon from "../Icon";
import Label from "../Label";

export const getBackgroundByType = (type: TInputType) => {
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

export const getColorsClassesByType = (type: TInputType) => {
  switch (type) {
    case "primary": {
      return `border-gray-300 focus:border-gray-400 text-gray-700 placeholder:text-gray-400 ${getBackgroundByType(
        type
      )}`;
    }
    case "error": {
      return `border-red-300 focus:border-red-400 text-red-300 placeholder:text-red-300 ${getBackgroundByType(
        type
      )}`;
    }
    case "error": {
      return `border-gray-300 focus:border-gray-400 text-gray-300 placeholder:text-gray-300 ${getBackgroundByType(
        type
      )}`;
    }
  }
};

const Input = React.forwardRef<HTMLInputElement, IInput>(
  (
    {
      className = "",
      inputContainerClassName = "",
      placeholder,
      label,
      error,
      type = error ? "error" : "primary",
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
      inputType,
      ...props
    },
    ref
  ) => {
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
            className={`absolute top-[23%] ${
              leftButtonLabel ? "left-s8" : "left-s16"
            } ${getBackgroundByType(type)} ${leftComponentClassname}`}
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
            className={`absolute top-[23%] ${
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

    return (
      <div className="py-[10px] md:py-[12px]">
        {label && (
          <Label text={label} htmlFor={props.id} required={props.required} />
        )}
        <div
          className={`group relative w-full md:w-[504px] ${inputContainerClassName}`}
        >
          <input
            ref={ref}
            {...props}
            type={inputType}
            style={parseDynamicStyles()}
            className={`w-full border-2 border-solid rounded-xl px-s16 py-[10px] text-fs18 font-AirbnbCerealMedium ${getColorsClassesByType(
              type
            )} ${className}`}
            placeholder={placeholder}
            disabled={type === "disabled"}
            onKeyDown={(e) => {
              props.onKeyDown && props.onKeyDown(e);
              if (inputType === "number" && e.key.toLowerCase() === "e") {
                console.log("hasdasd");
                e.preventDefault();
              }
            }}
          />
          <div className="text-fs12 font-AirbnbCerealMedium text-red-300 mt-s4 pl-s2 absolute mb-s4">
            {error}
          </div>
          {hasRightComponent && renderRightComponent()}
          {hasLeftComponent && renderLeftComponent()}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
