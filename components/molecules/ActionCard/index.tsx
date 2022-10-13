import Image from "next/image";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Text from "../../atoms/Text";
import { IActionCard } from "./types";

const ActionCard: React.FC<IActionCard> = ({
  imgProps,
  title,
  body,
  action,
  onClickAction,
  className = "",
}) => {
  return (
    <Card
      className={`justify-center flex flex-col items-center !py-s40 ${className}`}
    >
      <Image alt={title} {...imgProps} />
      <Text text={title} type="p1" weight="medium" className="my-[18px]" />
      {!!body && (
        <Text
          text={body}
          type="p4"
          weight="light"
          color="text-gray-400 text-center"
          className="mb-[18px] whitespace-pre-wrap"
        />
      )}
      <Button
        text={action}
        type="secondary"
        size="medium"
        autoWidth
        onClick={onClickAction}
        className={"md:w-[188px] md:px-[0px]"}
      />
    </Card>
  );
};

export default ActionCard;
