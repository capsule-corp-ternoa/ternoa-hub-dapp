import { IconNamesType } from "../Icon/types";
import { TInputType } from "../Input/types";
import { ISwitch, TSwitchType } from "../Switch/types";

export interface IInputSwitch extends Omit<ISwitch, "type"> {
  type?: TInputType;
  switchType?: TSwitchType;
  value: string;
  label?: string;
  leftIcon?: IconNamesType;
}
