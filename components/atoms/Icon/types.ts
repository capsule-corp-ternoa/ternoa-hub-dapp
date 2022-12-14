export type IconSizeType = 16 | 20 | 24 | 32 | 64 | 128;
import { IconWeight } from "phosphor-react";

export type IconNamesType =
  | "CaretLeft"
  | "CaretRight"
  | "CaretUp"
  | "CaretDown"
  | "Copy"
  | "Delete"
  | "Plus"
  | "DotsThree"
  | "Backspace"
  | "ArrowLeft"
  | "Eye"
  | "EyeSlash"
  | "ArrowCounterClockwise"
  | "NotePencil"
  | "PencilSimple"
  | "Check"
  | "ArrowsOut"
  | "FadersHorizontal"
  | "MagnifyingGlass"
  | "Share"
  | "Heart"
  | "Info"
  | "Warning"
  | "WarningCircle"
  | "File"
  | "FileSearch"
  | "ArrowFatLineDown"
  | "DeviceMobile"
  | "CheckCircle"
  | "X"
  | "TwitterLogo"
  | "Percent"
  | "Power"
  | "SignOut"
  | "Lock";

export interface IIcon {
  name: IconNamesType;
  size: IconSizeType;
  color?: string;
  className?: string;
  weight?: IconWeight;
}
