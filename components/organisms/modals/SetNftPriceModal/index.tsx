import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";
import Modal from "../../../atoms/Modal";
import Text from "../../../atoms/Text";
import { ISetNFTPriceFormResult, ISetNftPriceModal } from "./types";

const SetNftPriceModal: React.FC<ISetNftPriceModal> = ({
  onSubmit,
  ...props
}) => {
  const schema = yup.object({
    price: yup
      .number()
      .typeError("You must specify a price")
      .min(0)
      .label("Price"),
  });

  const formData = useForm<ISetNFTPriceFormResult>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formData;

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
            placeholder="Price in CAPS"
            required={true}
            error={errors.price?.message}
            defaultValue={undefined}
            inputType="number"
            min={0}
            {...register("price")}
          />
          <Button
            text="List NFT"
            type="quaternary"
            size="medium"
            className="mt-s20"
            onClick={onClickSubmit}
          />
        </form>
      </div>
    </Modal>
  );
};

export default SetNftPriceModal;
