import Text from "../../atoms/Text";
import AddressMenuButton from "../../molecules/AddressMenuButton";
import { IMarketplaceNavbar } from "./types";
import ImagePreview from "../../atoms/ImagePreview";
import LoaderEllipsis from "../../atoms/LoaderEllipsis";
import { parseOffchainDataImage } from "../../../utils/strings";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";

const MarketplaceNavbar: React.FC<IMarketplaceNavbar> = ({
  onClickAddress,
  marketplaceName,
  marketplaceLogo,
  isEditVisible,
  onClickEdit,
  mainColor,
  ...props
}) => {
  const { isCurrentBreakpoint } = useWindowBreakpoint();

  return (
    <nav className="h-[120px] md:h-[113px] w-full bg-white-default flex justify-center">
      <div className="flex flex-row items-center justify-between w-full pl-s8 pr-s8 md:pl-[42px] md:pr-[36px]">
        <a className="flex flex-row items-center">
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
            className="w-[33px] h-[33px] md:w-[52px] md:h-[52px] mr-s8 md:mr-[13px]"
          />
          <Text text={marketplaceName} type="h4" weight="bold" />
        </a>
        <div className="flex flex-row items-center">
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
            className={`md:ml-s16 ml-s8`}
            color={mainColor}
            disabled={false}
          />
        </div>
      </div>
    </nav>
  );
};

export default MarketplaceNavbar;
