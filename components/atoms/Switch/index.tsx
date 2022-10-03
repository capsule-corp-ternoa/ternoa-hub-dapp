import React from "react";
import { ISwitch } from "./types";

const Switch: React.FC<ISwitch> = ({
  type = "primary",
  label,
  id,
  ...props
}) => {
  const getBackgroundColorByType = () => {
    switch (type) {
      case "primary":
        return "before:bg-black-default";
      case "secondary":
        return "before:bg-blue-default";
    }
  };
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        {...props}
        className="toggle-switch-checkbox"
        id={id}
      />
      {id ? (
        <label className="toggle-switch-label border-bg-gray-400" tabIndex={1} htmlFor={id}>
          <span
            className={`toggle-switch-inner after:bg-gray-400 ${getBackgroundColorByType()}`}
            tabIndex={-1}
          />
          <span
            className="toggle-switch-switch border-bg-gray-400"
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
};

export default Switch;
