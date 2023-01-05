import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoaderEllipsis from "../../../components/atoms/LoaderEllipsis";
import IconModal from "../../../components/molecules/IconModal";
import { RootState } from "../../../store";

const BlockchainTxModals: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.blockchainTx);
  const [isCreateErrorModalVisible, setIsCreateErrorModalVisible] =
    useState<boolean>(false);
  const [isSubmitErrorModalVisible, setIsSubmitErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateErrorModalVisible(Boolean(status.creatingError));
  }, [status.creatingError]);

  useEffect(() => {
    setIsSubmitErrorModalVisible(Boolean(status.submitError));
  }, [status.submitError]);

  return (
    <React.Fragment>
      <IconModal
        isOpened={status.creatingState === "loading"}
        iconComponent={<LoaderEllipsis />}
        title="Creating blockchain transaction"
      />
      <IconModal
        isOpened={status.submitState === "loading"}
        iconComponent={<LoaderEllipsis />}
        title="Submitting blockchain transaction"
        body="it should be confirmed on the blockchain shortly..."
      />
      <IconModal
        iconName="Warning"
        isOpened={isCreateErrorModalVisible}
        onClose={() => setIsCreateErrorModalVisible(false)}
        title="There was an error trying to create the transaction"
        body={`Details: ${status.creatingError?.message}`}
      />
      <IconModal
        iconName="Warning"
        isOpened={isSubmitErrorModalVisible}
        onClose={() => setIsSubmitErrorModalVisible(false)}
        title="There was an error trying to submit the transaction"
        body={status.submitError?.message}
      />
    </React.Fragment>
  );
};

export default BlockchainTxModals;
