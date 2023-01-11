import React, { useState } from "react";
import { IUserAddressBlock } from "./types";
import Avatar from "../../atoms/Avatar";
import { middleEllipsis } from "../../../utils/strings";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";
import Icon from "../../atoms/Icon";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

const UserAddressBlock = React.forwardRef<HTMLDivElement, IUserAddressBlock>(
  (
    {
      pubKey,
      onClick,
      icon,
      iconSize = 24,
      iconColor,
      avatarSize = 38,

    },
  ) => {
    const { isCurrentBreakpoint } = useWindowBreakpoint();
    const { copyToClipboard, isClipboardSupported } = useCopyToClipboard();
    const [copied, setCopied] = useState<boolean>();

    return (
      <button onClick={async () => {
        onClick && onClick();
        setCopied(await copyToClipboard(pubKey));
      }}>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex">
            <Avatar pubKey={pubKey} size={avatarSize} theme="polkadot" />
          </div>
          <div className="text-ellipsis overflow-hidden mx-s8">
            {middleEllipsis(pubKey, isCurrentBreakpoint("md") ? 10 : 8)}
          </div>
          {isClipboardSupported && (
            <Icon
              name={icon ? icon : copied ? "Check" : "Copy"}
              size={iconSize ? iconSize : 20}
              color={iconColor ? iconColor : "black"}
              className="ml-s24"
            />
          )}
        </div >
      </button >
    );
  }
);

UserAddressBlock.displayName = "UserAddressBlock";
export default UserAddressBlock;
