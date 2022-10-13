import { UseFormReturn } from "react-hook-form";

export interface ICollectionFormResult {
  name: string;
  description: string;
  isSensitive: boolean;
  categories: string[];
  logo: File;
  banner: File;
  limit?: number;
}

export interface onSubmitParams {
  result: ICollectionFormResult;
  formData: UseFormReturn<ICollectionFormResult>;
}

export interface ICreateCollectionTemplate {
  onSubmit: (params: onSubmitParams) => void;
  disabled?: boolean;
}
