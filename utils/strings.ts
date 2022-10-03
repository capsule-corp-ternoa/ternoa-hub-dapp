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
    return `${process.env.NEXT_PUBLIC_ALPHANET_IPFS_GATEWAY_BASE_URL}/ipfs/${s}`;
  }
};
