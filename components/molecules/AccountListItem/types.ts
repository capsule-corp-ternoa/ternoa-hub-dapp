export interface IAccountListItem {
  className?: string;
  pubKey: string;
  onDelete?: () => void;
}
