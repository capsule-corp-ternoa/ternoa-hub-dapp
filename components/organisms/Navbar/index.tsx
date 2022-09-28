import Link from "next/link";
import GridWrapper from "../../atoms/GridWrapper";
import Logo from "../../atoms/Logo";
import Text from "../../atoms/Text";
import CapsIndicator from "../../molecules/CapsIndicator";
import { INavbar } from "./types";
import { useRef, useState } from "react";
import NavbarMenu from "../../molecules/NavbarMenu";
import Button from "../../atoms/Button";

const Navbar: React.FC<INavbar> = ({
  onClickAddress,
  onClickMyNfts,
  onClickLogout,
  ...props
}) => {
  const capsIndicatorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <nav className="h-[120px] md:h-[113px] w-full bg-white-default flex justify-center">
      <GridWrapper className="flex flex-row items-center justify-between">
        <Link href="/">
          <a className="flex flex-row items-center">
            <Logo className="mr-s4" />
            <Text text="TernoArt" type="h5" weight="bold" />
          </a>
        </Link>
        <div className="flex items-center">
          <Link href="/">
            <Button
              type="secondary"
              text="Create NFT"
              size="small"
              autoWidth={true}
              className="!px-s28 rounded-full hidden sm:block"
            />
          </Link>
          <CapsIndicator
            {...props}
            ref={capsIndicatorRef}
            onClickConnected={() => setOpen(true)}
          />
        </div>
        {props.pubKey && (
          <NavbarMenu
            onClickAddress={onClickAddress}
            onClickMyNfts={onClickMyNfts}
            onClickLogout={onClickLogout}
            pubKey={props.pubKey}
            state={isOpen ? "open" : "closed"}
            onClose={() => setOpen(false)}
            anchorRef={capsIndicatorRef}
          />
        )}
      </GridWrapper>
    </nav>
  );
};

export default Navbar;
