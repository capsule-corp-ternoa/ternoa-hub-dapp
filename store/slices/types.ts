export type BlockchainState = {
  isLoadingBalances: boolean;
  balances?: Balances;
};

export type Balances = {
  free: string;
  reserved: string;
  miscFrozen: string;
  feeFrozen: string;
};
