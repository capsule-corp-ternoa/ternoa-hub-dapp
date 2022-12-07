import GridWrapper from "../../atoms/GridWrapper";
import Icon from "../../atoms/Icon";
import Text from "../../atoms/Text";
import { IFooter } from "./types";

const Footer: React.FC<IFooter> = ({ className = "" }) => {
  return (
    <footer
      className={`h-[86px] md:h-[86px] w-full flex justify-center items-center ${className}`}
    >
      <Text
        type="p3"
        text="© 2022 Ternoa HUB - v0.3 - All rights reserved."
        color="text-gray-800"
        weight="medium"
      />
    </footer>
  );
};

export default Footer;
