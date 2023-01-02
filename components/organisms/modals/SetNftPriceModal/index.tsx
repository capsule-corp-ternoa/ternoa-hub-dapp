import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { ISetNFTPriceFormResult, ISetNftPriceModal } from "./types";

const SetNftPriceModal: React.FC<ISetNftPriceModal> = ({
  onSubmit,
  exchangeRate,
  isLoadingExchangeRate,
  mainColor,
  ...props
}) => {
  const schema = yup.object({
    price: yup
      .string()
      .typeError("You must specify a price")
      .min(0)
      .label("Price"),
  });

  const [usdPrice, setUsdPrice] = useState<number>();

  const formData = useForm<ISetNFTPriceFormResult>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formData;

  const watchPrice = watch("price");

  useEffect(() => {
    if (exchangeRate) {
      const price = parseFloat(watchPrice) * exchangeRate;
      setUsdPrice(price || undefined);
    }
  }, [watchPrice, exchangeRate]);

  const parsePriceText = () => {
    if (isLoadingExchangeRate) {
      return "Calculating price...";
    } else if (usdPrice) {
      return `~ ${usdPrice.toFixed(2)} USD`;
    } else {
      return "";
    }
  };

  const onClickSubmit = () => {
    handleSubmit((formResponse) => {
      onSubmit({ result: formResponse, formData });
    })();
  };

  return (
    <Modal {...props} className="bg-gray-50 p-s2">
      <div className="w-[90vw] h-auto md:w-[616px] flex flex-col items-center p-s16 md:p-s24 bg-gray-50">
        <Text type="h5" text="Set NFT price" weight="bold" />
        <form className="mt-s8 flex flex-col">
          <Input
            id="price"
            placeholder="Price"
            required={true}
            error={errors.price?.message}
            defaultValue={undefined}
            inputType="number"
            min={0}
            rightComponent={<Text type="p3" weight="bold" text="CAPS" />}
            rightComponentClassname="top-[15px]"
            {...register("price")}
          />
          <Text
            type="p5"
            weight="medium"
            text={parsePriceText()}
            color="text-gray-400"
          />
          <Button
            text="List NFT"
            type="primary"
            size="medium"
            className="mt-s20"
            style={mainColor ? { backgroundColor: mainColor } : {}}
            onClick={onClickSubmit}
          />
        </form>
      </div>
    </Modal>
  );
};

export default SetNftPriceModal;
