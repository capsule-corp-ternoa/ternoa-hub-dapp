export type IconSizeType = 16 | 24 | 32;

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
  | "Check"
  | "ArrowsOut"
  | "FadersHorizontal"
  | "MagnifyingGlass"
  | "Share"
  | "Heart"
  | "Info"
  | "Warning";

export interface IIcon {
  name: IconNamesType;
  size: IconSizeType;
  color?: string;
}
