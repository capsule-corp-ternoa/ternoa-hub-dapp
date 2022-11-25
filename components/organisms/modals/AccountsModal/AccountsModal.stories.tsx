import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AccountsModal from ".";
import { mockAccountsModalProps } from "./AccountsModal.mocks";
import { IAccountsModal } from "./types";

export default {
  title: "organisms/modals/AccountsModal",
  component: AccountsModal,
  argTypes: {},
} as ComponentMeta<typeof AccountsModal>;

const Template: ComponentStory<typeof AccountsModal> = (args) => {
  const [accounts, setAccounts] = useState<string[]>(args.accounts);
  return <AccountsModal {...args} accounts={accounts} onChange={setAccounts} />;
};

export const Base = Template.bind({});

Base.args = {
  ...mockAccountsModalProps.base,
} as IAccountsModal;
