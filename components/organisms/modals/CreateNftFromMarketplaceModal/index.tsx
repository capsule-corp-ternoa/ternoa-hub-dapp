import Modal from "../../../atoms/Modal";
import CreateNftTemplate from "../../../templates/CreateNftTemplate";
import { ICreateNftFromMarketplaceModal } from "./types";

const CreateNftFromMarketplaceModal: React.FC<ICreateNftFromMarketplaceModal> =
  ({ onSubmit, ...props }) => {
    return (
      <Modal {...props} className="max-h-[90vh] overflow-auto" closeIconClassName="z-10 top-[10px]">
        <CreateNftTemplate
          onSubmit={onSubmit}
          noTitle={true}
          noQuantity={true}
        />
      </Modal>
    );
  };

export default CreateNftFromMarketplaceModal;
