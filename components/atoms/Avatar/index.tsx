import dynamic from "next/dynamic";
const Identicon = dynamic(() => import("@polkadot/react-identicon"), {
  ssr: false,
});
import { IAvatar } from "./types";

const Avatar: React.FC<IAvatar> = ({
  pubKey,
  size,
  theme = "substrate",
  className = "",
}) => {
  return (
    <Identicon
      value={pubKey}
      size={size}
      theme={theme}
      className={`!cursor-pointer ${className}`}
    />
  );
};

export default Avatar;
