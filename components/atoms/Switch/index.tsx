import { ISwitch, TSwitchType } from "./types";
import { Switch as MaterialSwitch } from "@material-tailwind/react";

const Switch: React.FC<ISwitch> = ({ id, label, type }) => {
  const getSwitchClassByType = (type: TSwitchType) => {
    switch (type) {
      case "primary":
        return "checked:bg-black-default";
      case "secondary":
        return "checked:bg-blue-default";
    }
  };

  const getCircleClassByType = (type: TSwitchType) => {
    switch (type) {
      case "primary":
        return "peer-checked:border-black-default";
      case "secondary":
        return "peer-checked:border-blue-default";
    }
  };

  return (
    <MaterialSwitch
      id={id}
      label={label}
      labelProps={{ className: "relative top-s4 left-s8 text-fs14 font-AirbnbCerealBold" }}
      className={`${getSwitchClassByType(
        type
      )} bg-gray-400 h-[1.55rem] w-[2.75rem]`}
      circleProps={{
        className: `${getCircleClassByType(
          type
        )} left-[1px] peer-checked:-left-[0.6px] bg-white-default peer-checked:bg-white-default top-3 h-[1.37rem] w-[1.37rem]`,
      }}
    />
  );
};

export default Switch;
