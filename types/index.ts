export type LoadingState = "idle" | "loading" | "finished";

export interface NftJsonData {
  title: string;
  description: string;
  image: string;
  properties: {
    media: {
      hash: string;
      type: string;
      size: string;
    };
  };
}
