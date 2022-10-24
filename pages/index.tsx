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
          <div className="flex flex-col lg:flex-row w-full lg:w-auto">
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
              className="w-full lg:w-[332px] lg:mr-s24 mb-s16"
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
              onClickAction={() => onClickAction('/createcollection')}
              className="w-full lg:w-[332px] lg:mr-s24 mb-s16"
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
              onClickAction={() => {}}
              className="w-full lg:w-[332px] mb-s16 !pt-[32px]"
            />
          </div>
        </GridWrapper>
      </div>
    </BaseTemplate>
  );
};

export default Home;
