import { NextPage } from "next";
import { useRouter } from "next/router";
import GridWrapper from "../components/atoms/GridWrapper";
import Text from "../components/atoms/Text";
import ActionCard from "../components/molecules/ActionCard";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";
import * as Features from "../constants/features";

const Home: NextPage = () => {
  const router = useRouter();
  const { account, connect } = useWalletConnectClient();

  const onClickAction = async (route: string) => {
    if (account) {
      router.push(route);
    } else {
      await connect();
      router.push(route);
    }
  };

  const renderQuestionCard = () => (
    <div className="w-[97px] h-[148px] bg-gray-300 flex items-center justify-center rounded-lg border-gray-200 border-[3px]">
      <span className="font-AirbnbCerealMedium text-[70px] text-gray-500">
        ?
      </span>
    </div>
  );

  return (
    <BaseTemplate>
      <div className="flex flex-1 md:pt-[100px] pt-s24 justify-center">
        <GridWrapper className="flex items-center flex-col mb-s136">
          <Text text="Ternoa HUB" type="h1" weight="medium" />
          <Text
            text="We help creators make their ideas come to life."
            type="h4"
            weight="medium"
            color="text-gray-600"
            className="md:mt-s20 mt-s16 md:mb-[80px] mb-s40 text-center"
          />
          <div className="w-full grid grid-cols-homeCards md:grid-cols-homeCardsDesktop gap-s16 md:gap-s24">
            <ActionCard
              imgProps={{
                src: "/nft-frame.svg",
                alt: "Create an NFT",
                width: 97,
                height: 148,
              }}
              title={Features.CREATE_BASIC_NFT.name}
              body={Features.CREATE_BASIC_NFT.description}
              action="Create"
              onClickAction={() => onClickAction("/createnft")}
            />
            <ActionCard
              imgProps={{
                src: "/collection-frame.svg",
                alt: "Collection",
                width: 97,
                height: 148,
              }}
              title={Features.CREATE_COLLECTION.name}
              body={Features.CREATE_COLLECTION.description}
              action="Create"
              onClickAction={() => onClickAction("/createcollection")}
            />
            <ActionCard
              imgProps={{
                src: "/marketplace-frame.svg",
                alt: "Create a Marketplace",
                width: 204,
                height: 156,
              }}
              title={Features.CREATE_MARKETPLACE.name}
              body={Features.CREATE_MARKETPLACE.description}
              action="Create"
              onClickAction={() => onClickAction("/createmarketplace")}
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="In-app Token"
              body={`Create your own token to be associated with a dApp`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Royalties"
              body={`Update the royalties value on the NFTs you created`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Delegation"
              body={`Delegate your NFT to allow someone\n else to benefit from it's utility`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Soulbound Token"
              body={`Create a single NFT that is not transferable`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Auction"
              body={`List your NFT for auction `}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Rental NFT"
              body={`Monetize your NFT by renting it`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Secret NFT"
              body={`Create a single encrypted NFT that only the owner can decrypt`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="NFT Dealing"
              body={`Trade NFTs directly with another party\n `}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
          </div>
        </GridWrapper>
      </div>
    </BaseTemplate>
  );
};

export default Home;
