import Text from "../../atoms/Text";
import AddressMenuButton from "../../molecules/AddressMenuButton";
import { IMarketplaceNavbar } from "./types";
import ImagePreview from "../../atoms/ImagePreview";
import LoaderEllipsis from "../../atoms/LoaderEllipsis";
import { parseOffchainDataImage } from "../../../utils/strings";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";
import NavbarMenu from "../../molecules/NavbarMenu";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useWalletConnectClient } from "../../../hooks/useWalletConnectClient";

const MarketplaceNavbar: React.FC<IMarketplaceNavbar> = ({
  onClickAddress,
  marketplaceName,
  marketplaceLogo,
  isEditVisible,
  onClickEdit,
  mainColor,
  ...props
}) => {
  const router = useRouter();
  const AddressMenuButtonRef = useRef<HTMLDivElement>(null);
  const [isNavBarMenuOpen, setNavBarMenuOpen] = useState<boolean>(false);
  const { isCurrentBreakpoint } = useWindowBreakpoint();
  const {
    disconnect,
  } = useWalletConnectClient();
  

  const onClickLogout = () => {
    disconnect();
    router.push("/");
  };

  return (
    <nav className="h-[120px] md:h-[113px] w-full bg-white-default flex justify-center">
      <div className="flex flex-row items-center justify-between w-full pl-s8 pr-s8 md:pl-[42px] md:pr-[36px]">
        <a className="flex flex-row items-center whitespace-nowrap overflow-hidden text-ellipsis">
          <ImagePreview
            src={parseOffchainDataImage(marketplaceLogo)}
            alt={marketplaceName}
            loader={
              <LoaderEllipsis
                height={30}
                width={30}
                className="bg-[transparent]"
              />
            }
            className="w-[33px] min-w-[33px] h-[33px] md:w-[52px] md:min-w-[54px] md:h-[52px] mr-s8 md:mr-[13px]"
          />
          <Text text={marketplaceName} type="h4" weight="bold" className="overflow-hidden text-ellipsis" />
        </a>
        <div className="flex sm:flex-row flex-col-reverse items-center">
          {isEditVisible && (
            <Button
              text={isCurrentBreakpoint("md") ? "Edit Marketplace" : "Edit"}
              type="secondary"
              size="small"
              autoWidth={true}
              className="px-s16"
              leftComponent={
                <Icon name="PencilSimple" size={16} className="mr-s8" />
              }
              onClick={onClickEdit}
            />
          )}
          <AddressMenuButton
            {...props}
            ref={AddressMenuButtonRef}
            onClickConnected={() => setNavBarMenuOpen(true)}
            className="md:ml-s16 ml-s8"
          />
        </div>
        {props.pubKey && (
          <NavbarMenu
            onClickMyNfts={() => router.push("/mynfts")}
            onClickAddress={onClickAddress}
            onClickLogout={onClickLogout}
            pubKey={props.pubKey}
            state={isNavBarMenuOpen ? "open" : "closed"}
            onClose={() => setNavBarMenuOpen(false)}
            anchorRef={AddressMenuButtonRef}
          />
        )}
    </div>
    </nav >
  );
};

export default MarketplaceNavbar;
