import { useState } from "react";
import Image from "next/image";
import { INavbarMenu } from "./types";
import {
  MenuItem as MenuItemInner,
  ControlledMenu,
  MenuItemProps,
} from "@szhsin/react-menu";
import Text from "../../atoms/Text";
import { middleEllipsis } from "../../../utils/strings";
import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

const NavbarMenu: React.FC<INavbarMenu> = ({
  pubKey,
  onClickAddress = () => {},
  onClickMyNfts,
  onClickLogout,
  ...props
}) => {
  const { copyToClipboard, isClipboardSupported } = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>();

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
      menuClassName="bg-gray-800 text-gray-500 !top-[30px] rounded-xl"
      onClose={(e) => {
        props.onClose && props.onClose(e);
        setCopied(false);
      }}
    >
      <MenuItem
        onClick={async (e) => {
          e.keepOpen = true;
          onClickAddress();
          setCopied(await copyToClipboard(pubKey));
        }}
      >
        <Avatar pubKey={pubKey} size={25} theme="polkadot" />
        <Text
          weight="light"
          type="p3"
          text={
            copied ? "Address copied to clipboard!" : middleEllipsis(pubKey || "", 18)
          }
          className="ml-s16"
        />
        {isClipboardSupported && (
          <Icon
            name={copied ? "Check" : "Copy"}
            size={20}
            color="white"
            className="ml-s24"
          />
        )}
      </MenuItem>
      <MenuItem className="" onClick={onClickMyNfts}>
        <div className="w-s20 h-s20 relative">
          <Image
            src="/cards-filled.svg"
            alt="My NFTs"
            layout="fill"
            color="white"
          />
        </div>
        <Text weight="light" type="p3" text="My NFTs" className="ml-s20" />
      </MenuItem>
      <MenuItem onClick={onClickLogout} className="!border-none">
        <Icon name="SignOut" size={24} color="white" />
        <Text weight="light" type="p3" text="Logout" className="ml-s20" />
      </MenuItem>
    </ControlledMenu>
  );
};

export default NavbarMenu;
