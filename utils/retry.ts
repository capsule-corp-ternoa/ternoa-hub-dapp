import { NotRetryableError } from "../types";

export const retry = async <T extends (...arg0: any[]) => any>(
  fn: T,
  params: Parameters<T>,
  attempt: number = 3,
  time: number = 3000
): Promise<Awaited<ReturnType<T>>> => {
  try {
    const data = await fn(...params);
    return data;
  } catch (e) {
    if (attempt === 0 || e instanceof NotRetryableError) {
      throw e;
    }
    await new Promise((sleep) => setTimeout(sleep, time));
    return retry(fn, params, attempt - 1, time);
  }
};
