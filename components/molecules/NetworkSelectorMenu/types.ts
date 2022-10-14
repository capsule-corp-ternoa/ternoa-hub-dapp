import { ControlledMenuProps } from "@szhsin/react-menu";
import { Network } from "../../../types";

export interface INetworkSelectorMenu extends ControlledMenuProps {
  onSelectNetork: (network: Network) => void;
  networks: Network[];
}
