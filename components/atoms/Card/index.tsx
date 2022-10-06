import { ICard } from "./types";

const Card: React.FC<ICard> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-gray-500 border-gray-200 border border-solid rounded-2xl p-[10px] md:p-s20 inline-block border-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
