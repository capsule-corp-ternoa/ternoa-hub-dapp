export type TSwitchType = "primary" | "secondary";

export interface ISwitch {
  type: TSwitchType;
  id: string;
  label: string;
}
