import { MenuItem as MenuItemInner } from "@szhsin/react-menu";
import { IMenuItem } from "./types";

// This component does not have an story because it need to be inside a Menu component in order to render
const MenuItem: React.FC<IMenuItem> = ({ ...props }) => {
  return (
    <MenuItemInner
      {...props}
      className={({ hover }) =>
        `${
          hover && "bg-gray-700 rounded"
        } border-b border-gray-700 py-s16 px-s8 mx-s16 ${props.className || ""}`
      }
    />
  );
};

export default MenuItem;
