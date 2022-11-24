export type OutdatedState = {
  marketplaces: OutdatedTimestamp;
};

export type OutdatedTimestamp = {
  [id: string]: string | null;
};
