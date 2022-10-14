import GridWrapper from "../../atoms/GridWrapper";
import Icon from "../../atoms/Icon";
import Text from "../../atoms/Text";
import { IFooter } from "./types";

const Footer: React.FC<IFooter> = ({ className = "" }) => {
  return (
    <footer
      className={`h-[182px] md:h-[86px] w-full bg-gray-100 flex justify-center ${className}`}
    >
      <GridWrapper className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Text
            type="p3"
            text="© Ternoart. All rights reserved."
            color="text-gray-800"
            weight="light"
          />
          <div className="flex flex-row ml-s64">
            <Text
              type="p3"
              text="Terms"
              color="text-gray-800"
              weight="bold"
              className="mr-s20 cursor-pointer"
            />
            <Text
              type="p3"
              text="Privacy"
              color="text-gray-800"
              weight="bold"
              className="mr-s20 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <Icon size={24} color="black" weight="fill" name="TwitterLogo" />
        </div>
      </GridWrapper>
    </footer>
  );
};

export default Footer;
