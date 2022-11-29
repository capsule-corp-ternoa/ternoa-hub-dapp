import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";
import Button from "../../atoms/Button";
import NftLoader from "../../atoms/NftLoader";
import Text from "../../atoms/Text";
import MarketplaceListItem from "../../molecules/MarketplaceListItem";
import { IAccountMarketplacesTemplate } from "./types";

const AccountMarketplacesTemplate: React.FC<IAccountMarketplacesTemplate> = ({
  marketplaces,
  onClickAddNew,
  isLoading,
}) => {
  const { isCurrentBreakpoint } = useWindowBreakpoint();

  return (
    <div className="flex flex-col w-full">
      <div className="mb-s24 md:mb-s40 flex flex-row justify-between items-center">
        <Text type="h3" weight="bold" text="My Marketplaces" />
        <Button
          text={isCurrentBreakpoint("md") ? "Add a new marketplace" : "Add new"}
          type="primary"
          size="medium"
          autoWidth={true}
          className="px-s32"
          onClick={onClickAddNew}
        />
      </div>
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center mt-s56">
          <NftLoader text="Loading Marketplaces..." />
        </div>
      ) : (
        marketplaces?.map((marketplaceItem, i) => (
          <MarketplaceListItem
            {...marketplaceItem}
            key={i}
            className="mb-[14px]"
          />
        ))
      )}
    </div>
  );
};

export default AccountMarketplacesTemplate;
