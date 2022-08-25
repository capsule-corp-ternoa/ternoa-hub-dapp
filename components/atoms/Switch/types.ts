export type TSwitchType = "primary" | "secondary";

export interface ISwitch extends React.ComponentProps<"input"> {
  type?: TSwitchType;
  id: string;
  label?: string;
}