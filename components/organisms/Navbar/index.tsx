import GridWrapper from "../../atoms/GridWrapper";
import Logo from "../../atoms/Logo";
import Text from "../../atoms/Text";
import CapsIndicator from "../../molecules/CapsIndicator";
import { INavbar } from "./types";

const Navbar: React.FC<INavbar> = ({ ...props }) => {
  return (
    <nav className="h-[120px] md:h-[113px] w-full bg-white-default flex justify-center">
      <GridWrapper className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Logo className="mr-s4" />
          <Text text="TernoArt" type="h5" weight="bold" />
        </div>
        <CapsIndicator {...props} />
      </GridWrapper>
    </nav>
  );
};

export default Navbar;
