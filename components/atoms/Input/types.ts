import { IconNamesType } from "../Icon/types";

export type TInputType = "primary" | "disabled" | "error";

export interface IInput extends React.ComponentProps<"input"> {
  /**
   * Input type
   */
  type: TInputType;
  /**
   * Placeholder & label text
   */
  placeholder?: string;
  /**
   * Custom component that will be shown on the left.
   *
   * You might need to change leftPadding and element position (with leftComponentClassname) depending on component size
   */
  leftComponent?: React.ReactNode;
  /**
   * Custom component that will be shown on the right.
   *
   * You might need to change rightPadding and element position (with rightComponentClassname) depending on component size
   */
  rightComponent?: React.ReactNode;
  /**
   * Left component container custom classes
   */
  leftComponentClassname?: string;
  /**
   * Left component container custom classes
   */
  rightComponentClassname?: string;
  /**
   * Text left padding in px that will be applied if leftComponent is setted
   */
  leftPadding?: number;
  /**
   * Text right padding in px that will be applied if rightComponent is setted
   */
  rightPadding?: number;
  /**
   * On Press left component (icon and button too) handler
   */
  onPressLeftComponent?: () => void;
  /**
   * On Press right component (icon and button too) handler
   */
  onPressRightComponent?: () => void;
  /**
   * Name of the icon that will be shown on the left
   */
  leftIcon?: IconNamesType;
  /**
   * Name of the icon that will be shown on the right
   */
  rightIcon?: IconNamesType;
  /**
   * Label of the button that will be shown on the left
   *
   * You might need to change left padding depending on text length
   */
  leftButtonLabel?: string;
  /**
   * Label of the button that will be shown on the right
   *
   * You might need to change right padding depending on text length
   */
  rightButtonLabel?: string;
  /**
   * Label text
   */
  label?: string;
}
