export interface IFilter {
  name: string;
  quantity?: number;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
