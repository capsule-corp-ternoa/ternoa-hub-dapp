import { NextPage } from "next";
import { useRouter } from "next/router";
import GridWrapper from "../components/atoms/GridWrapper";
import Text from "../components/atoms/Text";
import ActionCard from "../components/molecules/ActionCard";
import BaseTemplate from "../components/templates/base/BaseTemplate";
import { useWalletConnectClient } from "../hooks/useWalletConnectClient";

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
      <span className="font-AirbnbCerealMedium text-[70px] text-gray-500">?</span>
    </div>
  );

  return (
    <BaseTemplate>
      <div className="flex flex-1 md:pt-[100px] pt-s24 justify-center">
        <GridWrapper className="flex items-center flex-col mb-s136">
          <Text text="Ternoa HUB" type="h1" weight="medium" />
          <Text
            text="We help creator to make their idea come to life."
            type="h4"
            weight="medium"
            color="text-gray-600"
            className="md:mt-s20 mt-s16 md:mb-[80px] mb-s40 text-center"
          />
          <div className="w-full grid grid-cols-homeCards md:grid-cols-homeCardsDesktop gap-s16 md:gap-s24">
            <ActionCard
              imgProps={{
                src: "/nft-frame.svg",
                alt: "Create NFTs",
                width: 97,
                height: 148,
              }}
              title="Basic NFTs"
              body={`Allows you to create a \n unique NFT`}
              action="Create NFTs"
              onClickAction={() => onClickAction("/createnft")}
            />
            <ActionCard
              imgProps={{
                src: "/collection-frame.svg",
                alt: "Create Collection",
                width: 97,
                height: 148,
              }}
              title="Create Collection"
              body={`Allows you to group several NFTs \ntogether`}
              action="Create Collection"
              onClickAction={() => onClickAction("/createcollection")}
            />
            <ActionCard
              imgProps={{
                src: "/marketplace-frame.svg",
                alt: "Set a Marketplace",
                width: 204,
                height: 156,
              }}
              title="Marketplace"
              body={`Allows you to create a place \nto sell your NFTs`}
              action="Set a Marketplace"
              onClickAction={() => onClickAction("/createmarketplace")}
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="In-app Token"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Royalties"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Delegation"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Soulbound Token"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Auction"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Rental NFT"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="Secret NFT"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="NFT Dealing"
              body={`Little description of the feature on two lines maximum.`}
              action="Coming soon..."
              disabled={true}
              className="border-dashed border-[2px]"
            />
            <ActionCard
              imgComponent={renderQuestionCard()}
              title="TEE enclave"
              body={`Little description of the feature on two lines maximum.`}
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
