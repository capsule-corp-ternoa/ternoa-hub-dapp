export type TButtonSize = "large" | "medium" | "small";
export type TButtonType = "primary" | "secondary" | "danger";

export interface IButton {
  text: string;
  size: TButtonSize;
  type: TButtonType;
  disabled?: boolean;
}
