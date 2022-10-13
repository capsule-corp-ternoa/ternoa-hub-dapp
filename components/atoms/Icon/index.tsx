import * as Phosphor from "phosphor-react";

import { IIcon } from "./types";

const Icon: React.FC<IIcon> = ({
  name,
  size,
  color = "#000",
  className = "",
  weight,
}) => {
  switch (name) {
    case "CaretLeft":
      return (
        <Phosphor.CaretLeft
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "CaretRight":
      return (
        <Phosphor.CaretRight
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "CaretUp":
      return (
        <Phosphor.CaretUp
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "CaretDown":
      return (
        <Phosphor.CaretDown
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Copy":
      return (
        <Phosphor.Copy
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Delete":
      return (
        <Phosphor.X
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Plus":
      return (
        <Phosphor.Plus
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "DotsThree":
      return (
        <Phosphor.DotsThree
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Backspace":
      return (
        <Phosphor.Backspace
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "ArrowLeft":
      return (
        <Phosphor.ArrowLeft
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Eye":
      return (
        <Phosphor.Eye
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "EyeSlash":
      return (
        <Phosphor.EyeSlash
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "ArrowCounterClockwise":
      return (
        <Phosphor.ArrowCounterClockwise
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "NotePencil":
      return (
        <Phosphor.NotePencil
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Check":
      return (
        <Phosphor.Check
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "ArrowsOut":
      return (
        <Phosphor.ArrowsOut
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "FadersHorizontal":
      return (
        <Phosphor.FadersHorizontal
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "MagnifyingGlass":
      return (
        <Phosphor.MagnifyingGlass
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Share":
      return (
        <Phosphor.Share
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Heart":
      return (
        <Phosphor.Heart
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Info":
      return (
        <Phosphor.Info
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Warning":
      return (
        <Phosphor.Warning
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "WarningCircle":
      return (
        <Phosphor.WarningCircle
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "File":
      return (
        <Phosphor.File
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "FileSearch":
      return (
        <Phosphor.FileSearch
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "ArrowFatLineDown":
      return (
        <Phosphor.ArrowFatLineDown
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "DeviceMobile":
      return (
        <Phosphor.DeviceMobile
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "CheckCircle":
      return (
        <Phosphor.CheckCircle
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "X":
      return (
        <Phosphor.X
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "TwitterLogo":
      return (
        <Phosphor.TwitterLogo
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Percent":
      return (
        <Phosphor.Percent
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "Power":
      return (
        <Phosphor.Power
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    case "SignOut":
      return (
        <Phosphor.SignOut
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
    default:
      return (
        <Phosphor.Question
          size={size}
          color={color}
          weight={weight}
          className={className}
        />
      );
  }
};

export default Icon;
