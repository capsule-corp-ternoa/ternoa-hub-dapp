import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import { hexToU8a, isHex } from "@polkadot/util";
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

export const formatPrice = (number: string) => {
  if (number === "0") {
    return number;
  }
  const num = new BN(number);
  const chainDecimals = new BN(Math.pow(10, TERNOA_CHAIN_DECIMALS).toString());
  const resultInteger = num.div(chainDecimals).toString();
  const addCommas = (str: string) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!parseFloat(resultInteger)) {
    // for numbers < 1
    return (Number(number) / Math.pow(10, TERNOA_CHAIN_DECIMALS))
      .toFixed(TERNOA_CHAIN_DECIMALS)
      .replace(/(\.\d*?[1-9])0+$/g, "$1");
  } else {
    const mod = num.mod(chainDecimals);
    const resultDecimals = mod.toString();
    if (parseFloat(resultDecimals)) {
      // for number with decimals
      return addCommas(
        `${resultInteger}.${resultDecimals}`.replace(/(\.\d*?[1-9])0+$/g, "$1")
      );
    }
    // numbers wihout decimals
    return addCommas(resultInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
};

export const priceWithChainDecimals = (number: string) => {
  const num = new BN(number);
  const chainDecimals = new BN(Math.pow(10, TERNOA_CHAIN_DECIMALS).toString());
  return num.mul(chainDecimals).toString();
};
