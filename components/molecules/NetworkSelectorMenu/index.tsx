import { INetworkSelectorMenu } from "./types";
import {
  MenuItem as MenuItemInner,
  ControlledMenu,
  MenuItemProps,
} from "@szhsin/react-menu";

const NetworkSelectorMenu: React.FC<INetworkSelectorMenu> = ({
  networks,
  onSelectNetork,
  ...props
}) => {
  const MenuItem = (props: MenuItemProps) => (
    <MenuItemInner
      {...props}
      className={({ hover }) =>
        `${
          hover && "bg-gray-700 rounded"
        } border-b border-gray-700 py-s16 px-s8 mx-s16 ${props.className || ""}`
      }
    />
  );

  return (
    <ControlledMenu
      {...props}
      align="end"
      className="!absolute"
      menuClassName="bg-gray-800 text-gray-500 !top-[30px]"
    >
      {networks.map((network, i) => {
        return (
          <MenuItem
            onClick={() => onSelectNetork(network)}
            key={network.name}
            className={i === networks.length - 1 ? "!border-none" : ""}
          >
            {network.name}
          </MenuItem>
        );
      })}
    </ControlledMenu>
  );
};

export default NetworkSelectorMenu;
