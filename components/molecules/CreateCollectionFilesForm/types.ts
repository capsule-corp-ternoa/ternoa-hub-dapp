import { Control } from "react-hook-form";
import { ICollectionFormResult } from "../../templates/CreateCollectionTemplate/types";

export interface ICreateCollectionFilesForm {
  onSelectLogo: (file: File) => void;
  onSelectBanner: (file: File) => void;
  logoValue?: File;
  bannerValue?: File;
  logoRef?: React.Ref<HTMLInputElement>;
  bannerRef?: React.Ref<HTMLInputElement>;
  className?: string;
  control?: Control<ICollectionFormResult, any>;
  logoError?: string;
  bannerError?: string;
}
