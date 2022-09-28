import Image from "next/image";
import { INftLoader } from "./types";
import LoaderEllipsis from "../LoaderEllipsis";
import Text from "../Text";

const NftLoader: React.FC<INftLoader> = ({ text, className = "" }) => {
  return (
    <div
      className={`flex justify-center items-center h-full flex-col animate-pulse ${className} `}
    >
      <div className="w-s48 h-s48 md:w-s136 md:h-s136 relative mb-s16 md:mb-s20">
        <Image src="/cards.svg" alt="Loading NFT" layout="fill" />
      </div>
      {text && (
        <Text
          text={text}
          weight="medium"
          type="p5"
          color="text-gray-600"
          className="hidden md:block"
        />
      )}
      <LoaderEllipsis className="w-s20 h-s20 md:w-s32 md:h-[20px]" />
    </div>
  );
};

export default NftLoader;
