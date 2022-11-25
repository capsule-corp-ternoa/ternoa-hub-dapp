export type ButtonToggleOption<T> = {
  label: string;
  value: T;
};

export interface IButtonToggle<T> {
  options: ButtonToggleOption<T>[];
  onChange: (value: any, index: number) => void;
  selectedIndex: number;
  className?: string;
  optionClassName?: string;
}
