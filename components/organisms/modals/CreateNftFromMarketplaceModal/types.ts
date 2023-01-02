import { IModal } from "../../../atoms/Modal/types";
import { ICreateNftTemplate } from "../../../templates/CreateNftTemplate/types";

export interface ICreateNftFromMarketplaceModal
  extends ICreateNftTemplate,
    Omit<IModal, "children"> {}
