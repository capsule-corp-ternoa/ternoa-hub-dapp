import Image from "next/image";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Text from "../../atoms/Text";
import { IActionCard } from "./types";

const ActionCard: React.FC<IActionCard> = ({
  imgComponent,
  imgProps,
  title,
  body,
  action,
  onClickAction = () => {},
  disabled,
  className = "",
}) => {
  return (
    <Card
      className={`justify-center flex flex-col items-center !py-s40 ${className}`}
    >
      {imgComponent
        ? imgComponent
        : imgProps && <Image alt={title} {...imgProps} />}
      <Text text={title} type="p1" weight="medium" className="my-[18px] text-center" />
      {!!body && (
        <Text
          text={body}
          type="p4"
          weight="light"
          color="text-gray-400"
          className="mb-[18px] whitespace-pre-wrap text-center"
        />
      )}
      <Button
        text={action}
        type="secondary"
        size="medium"
        autoWidth
        onClick={onClickAction}
        disabled={disabled}
        className={"md:w-[188px] md:px-[0px]"}
      />
    </Card>
  );
};

export default ActionCard;
