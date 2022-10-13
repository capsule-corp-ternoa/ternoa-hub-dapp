import Link from "next/link";
import GridWrapper from "../../atoms/GridWrapper";
import Logo from "../../atoms/Logo";
import Text from "../../atoms/Text";
import AddressMenuButton from "../../molecules/AddressMenuButton";
import { INavbar } from "./types";
import { useRef, useState } from "react";
import NavbarMenu from "../../molecules/NavbarMenu";
import NetworkSelectorButton from "../../molecules/NetworkSelectorButton";
import NetworkSelectorMenu from "../../molecules/NetworkSelectorMenu";
import { ALPHANET_NETWORK, MAINNET_NETWORK } from "../../../constants/network";

const Navbar: React.FC<INavbar> = ({
  onClickAddress,
  onClickMyNfts,
  onClickLogout,
  currentNetwork,
  onSelectNetwork,
  isLoadingNetwork,
  ...props
}) => {
  const AddressMenuButtonRef = useRef<HTMLDivElement>(null);
  const NetworkSelectorButtonRef = useRef<HTMLDivElement>(null);
  const [isNavBarMenuOpen, setNavBarMenuOpen] = useState<boolean>(false);
  const [isNetworkSelectorMenuOpen, setNetworkSelectorMenuOpen] =
    useState<boolean>(false);

  return (
    <nav className="h-[120px] md:h-[113px] w-full bg-white-default flex justify-center">
      <div className="flex flex-row items-center justify-between w-full pl-s8 pr-s8 md:pl-[42px] md:pr-[36px]">
        <Link href="/">
          <a className="flex flex-row items-center">
            <Logo className="mr-s8 md:mr-[13px]" />
            <Text text="ternoa HUB" type="h4" weight="bold" />
          </a>
        </Link>
        <div className="flex items-center">
          <NetworkSelectorButton
            currentNetworkName={currentNetwork.name}
            onClick={() => setNetworkSelectorMenuOpen(true)}
            isLoading={isLoadingNetwork}
            ref={NetworkSelectorButtonRef}
          />
          <AddressMenuButton
            {...props}
            ref={AddressMenuButtonRef}
            onClickConnected={() => setNavBarMenuOpen(true)}
            className="md:ml-s16 ml-s8"
            disabled={isLoadingNetwork}
          />
        </div>
        {props.pubKey && (
          <NavbarMenu
            onClickAddress={onClickAddress}
            onClickMyNfts={onClickMyNfts}
            onClickLogout={onClickLogout}
            pubKey={props.pubKey}
            state={isNavBarMenuOpen ? "open" : "closed"}
            onClose={() => setNavBarMenuOpen(false)}
            anchorRef={AddressMenuButtonRef}
          />
        )}
        <NetworkSelectorMenu
          networks={[MAINNET_NETWORK, ALPHANET_NETWORK].filter(
            (network) => network.name !== currentNetwork.name
          )}
          onSelectNetork={onSelectNetwork}
          anchorRef={NetworkSelectorButtonRef}
          state={isNetworkSelectorMenuOpen ? "open" : "closed"}
          onClose={() => setNetworkSelectorMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
