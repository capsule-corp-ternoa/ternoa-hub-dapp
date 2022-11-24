import { IAccountsModal } from "./types";

const base: IAccountsModal = {
  isOpened: true,
  accounts: [
    "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
  ],
  onChange: () => {},
};

export const mockAccountsModalProps = {
  base,
};
