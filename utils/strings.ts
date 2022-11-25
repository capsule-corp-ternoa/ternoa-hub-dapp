import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import { hexToU8a, isHex } from "@polkadot/util";

export const middleEllipsis = (s: string, n = 10) => {
  if (s.length < n) return s;
  const start = s.slice(0, n / 2);
  const end = s.slice(-(n / 2));
  return start + "..." + end;
};

export const isValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export const getJsonDataUrl = (s: string) => {
  if (isValidUrl(s)) {
    return s;
  } else {
    // ipfs hash
    return getIpfsUrlFromHash(s);
  }
};

export const getIpfsUrlFromHash = (hash: string) => {
  return `${process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_BASE_URL}/ipfs/${hash}`;
};

export const isValidAddressPolkadotAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
};

export const parseCommissionFee = (comissionFee: string) => {
  if (comissionFee) {
    const _comissionFee = parseFloat(comissionFee);
    return (_comissionFee * 10000).toString();
  } else {
    return undefined;
  }
};
