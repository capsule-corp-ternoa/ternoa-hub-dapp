export type BlockchainState = {
  isLoadingBalances: boolean;
  balances?: Balances;
  address?: string;
  isConnected: boolean;
};

export type Balances = {
  free: string;
  reserved: string;
  miscFrozen: string;
  feeFrozen: string;
};
