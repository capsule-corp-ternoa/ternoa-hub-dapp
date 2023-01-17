import React from "react";

export interface IImagePreview {
  isLoading?: boolean;
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  cover?:boolean;
  loader: React.ReactNode | React.ReactNode[];
}
