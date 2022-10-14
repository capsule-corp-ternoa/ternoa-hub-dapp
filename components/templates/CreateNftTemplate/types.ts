import { UseFormReturn } from "react-hook-form";

export interface INftFormResult {
  name: string;
  description: string;
  quantity: number;
  royalty: number;
  file: File;
  preview?: File;
}

export interface onSubmitParams {
  result: INftFormResult;
  formData: UseFormReturn<INftFormResult>;
}

export interface ICreateNftTemplate {
  onSubmit: (params: onSubmitParams) => void;
  disabled?: boolean;
}
