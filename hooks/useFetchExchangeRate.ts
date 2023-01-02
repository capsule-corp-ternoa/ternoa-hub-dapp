import { useState } from "react";
import { fetchExchangeRate } from "../services/coingecko";
import { LoadingState } from "../types";

export const useFetchExchangeRate = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error>();
  const [exchangeRate, setExchangeRate] = useState<number>();

  const _fetchExchangeRate = async () => {
    try {
      setLoadingState("loading");
      const response = await fetchExchangeRate();
      setExchangeRate(response);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoadingState("finished");
    }
  };

  return {
    fetchExchangeRate: _fetchExchangeRate,
    loadingState,
    error,
    exchangeRate,
  };
};
