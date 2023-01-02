import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import { hexToU8a, isHex } from "@polkadot/util";
import Big from "big.js";
import BN from "bn.js";
import { TERNOA_CHAIN_DECIMALS } from "../constants/blockchain";

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

export const parseOffchainDataImage = (urlOrHash: string) => {
  if (isValidUrl(urlOrHash)) {
    return urlOrHash;
  } else {
    return `${process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_BASE_URL}/ipfs/${urlOrHash}`;
  }
};

/**
 * Format price to a floating number in string (ex: "100,000,000.01", "0.000000001")
 * we use big.js instead of BN because is better to manage floating-point numbers
 * @param number price as string
 * @returns formatted price substracting chain decimals
 */
export const formatPrice = (number: string) => {
  if (number === "0" || !number) {
    return number;
  }
  const value = new Big(number);
  const chainDecimals = new Big(Math.pow(10, 18));
  const result = value.div(chainDecimals);
  const addCommas = (str: string) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (result.toFixed(2) === "0.00") {
    // for numbers < 0.01
    return result.toFixed();
  } else {
    return addCommas(value.div(chainDecimals).toFixed(2));
  }
};

export const priceWithChainDecimals = (number: string) => {
  const num = new BN(number);
  const chainDecimals = new BN(Math.pow(10, TERNOA_CHAIN_DECIMALS).toString());
  return num.mul(chainDecimals).toString();
};
