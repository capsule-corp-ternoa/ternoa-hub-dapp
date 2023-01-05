import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoaderEllipsis from "../../../components/atoms/LoaderEllipsis";
import IconModal from "../../../components/molecules/IconModal";
import { RootState } from "../../../store";

const IpfsModals: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.ipfs);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setIsErrorModalVisible(Boolean(status.error));
  }, [status.error]);

  return (
    <React.Fragment>
      <IconModal
        isOpened={status.loadingState === "loading"}
        iconComponent={<LoaderEllipsis />}
        title="Uploading data to IPFS"
      />
      <IconModal
        iconName="Warning"
        isOpened={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        title="There was an error trying to create the transaction"
        body={`Details: ${status.error?.message}`}
      />
    </React.Fragment>
  );
};

export default IpfsModals;
