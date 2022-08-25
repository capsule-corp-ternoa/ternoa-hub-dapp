export type TAvatarSize = 25 | 38 | 64 | 72 | 87;

export type TextFontWeightType =
  | "substrate"
  | "polkadot"
  | "beachball"
  | "jdenticon";

export interface IAvatar {
  pubKey: string;
  size: TAvatarSize;
  theme?: TextFontWeightType;
}
