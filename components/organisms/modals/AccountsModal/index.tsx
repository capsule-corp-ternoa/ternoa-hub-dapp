import React, { useState } from "react";
import {
  isValidAddressPolkadotAddress,
  middleEllipsis,
} from "../../../../utils/strings";
import Icon from "../../../atoms/Icon";
import Input from "../../../atoms/Input";
import LoaderEllipsis from "../../../atoms/LoaderEllipsis";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import AccountListItem from "../../../molecules/AccountListItem";
import { AccountInput, IAccountsModal } from "./types";

const AccountsModal: React.FC<IAccountsModal> = ({
  accounts,
  onChange,
  ...props
}) => {
  const [inputs, setInputs] = useState<AccountInput[]>([]);

  const onPressInputAdd = (pubkey: string, inputIndex: number) => {
    if (isValidAddressPolkadotAddress(pubkey)) {
      onChange([...accounts, pubkey]);
      setInputs((prevInputs) => prevInputs.filter((_v, i) => i !== inputIndex));
    } else {
      setInputs((prevInputs) =>
        prevInputs.map((_input, index) => {
          if (index === inputIndex) {
            return { value: _input.value, error: "Invalid Account" };
          } else {
            return _input;
          }
        })
      );
    }
  };

  const onPressDelete = (accountIndex: number) => {
    onChange(accounts.filter((_a, i) => i !== accountIndex));
  };

  return (
    <Modal {...props} closeIconColor="black">
      <div className="md:w-[561px] md:min-h-[566px] max-h-[80vh] w-[341px] min-h-[408px] flex flex-col p-s16 md:p-s24 overflow-y-auto">
        <Text type="h3" text="Add Account" weight="bold" />
        <Text
          type="p2"
          text="These are the accounts that will have access to your private marketplace"
          weight="light"
          color="text-gray-400"
          className="mt-s8"
        />
        <div className="md:mt-s32 mt-s16">
          {accounts.map((pubkey, i) => (
            <div
              className="bg-gray-100 mt-[12px] px-[12px] py-s8 rounded-xl"
              key={pubkey}
            >
              <AccountListItem
                pubKey={pubkey}
                onDelete={() => onPressDelete(i)}
              />
            </div>
          ))}
        </div>
        {inputs.map((input, i) => (
          <Input
            key={i}
            placeholder="Account public key"
            rightButtonLabel="+ Add"
            rightPadding={70}
            value={input.value}
            onPressRightComponent={() => onPressInputAdd(input.value, i)}
            error={input.error}
            onChange={(e) =>
              setInputs((prevInputs) =>
                prevInputs.map((_input, index) => {
                  if (index === i) {
                    return { value: e.target.value };
                  } else {
                    return _input;
                  }
                })
              )
            }
          />
        ))}
        <div className="bg-gray-100 mt-[12px] px-[12px] py-s8 rounded-xl">
          <div
            className={`flex flex-row w-full bg-gray-500 border-dashed border-2 border-gray-300 rounded-xl p-[12px] md:pd-s16 justify-center cursor-pointer`}
            onClick={() => setInputs([...inputs, { value: "" }])}
          >
            <Text
              type="p2"
              weight="light"
              text="+ Add new account"
              color="text-gray-400"
            ></Text>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountsModal;
