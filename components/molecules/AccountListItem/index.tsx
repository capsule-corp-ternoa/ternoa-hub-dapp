import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";
import { middleEllipsis } from "../../../utils/strings";
import Avatar from "../../atoms/Avatar";
import Icon from "../../atoms/Icon";
import Text from "../../atoms/Text";
import { IAccountListItem } from "./types";

const AccountListItem: React.FC<IAccountListItem> = ({
  pubKey,
  className = "",
  onDelete,
}) => {
  const { isCurrentBreakpoint } = useWindowBreakpoint();

  return (
    <div
      className={`flex flex-row w-full bg-gray-500 border-solid border-2 border-gray-300 rounded-xl p-[12px] md:pd-s16 justify-between ${className}`}
    >
      <div className="flex flex-row items-center">
        <Avatar pubKey={pubKey} size={25} theme="polkadot" />
        <Text
          type="p2"
          color="text-gray-700"
          weight="light"
          text={middleEllipsis(pubKey, isCurrentBreakpoint("md") ? 18 : 10)}
          className="md:ml-[12px] ml-s8"
        />
      </div>
      {onDelete && (
        <div
          className="rounded-full bg-gray-300 flex justify-center items-center p-s4 cursor-pointer"
          onClick={onDelete}
        >
          <Icon name="X" size={16} color="#475569" weight="bold" />
        </div>
      )}
    </div>
  );
};

export default AccountListItem;
