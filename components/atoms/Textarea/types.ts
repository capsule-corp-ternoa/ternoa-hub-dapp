import { TInputType } from "../Input/types";

export interface ITextarea extends React.ComponentProps<"textarea"> {
  type?: TInputType;
  label?: string;
  error?: string;
}
