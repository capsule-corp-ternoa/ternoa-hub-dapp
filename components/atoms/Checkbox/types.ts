export interface ICheckbox extends Omit<React.ComponentProps<"input">, "type"> {
  checked: boolean;
  className?: string;
}
