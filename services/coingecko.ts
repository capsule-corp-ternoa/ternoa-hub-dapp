import axios from "axios";

export const fetchExchangeRate = async (): Promise<number> => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=coin-capsule&vs_currencies=usd",
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
  return response.data["coin-capsule"]["usd"];
};
