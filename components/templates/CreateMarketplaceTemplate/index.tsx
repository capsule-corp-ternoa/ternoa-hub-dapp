import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { ICreateMarketplaceTemplate, IMarketplaceFormResult } from "./types";
import InputSwitch from "../../atoms/InputSwitch";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";

const CreateMarketplaceTemplate: React.FC<ICreateMarketplaceTemplate> = ({
  onSubmit,
  disabled,
}) => {
  const { isCurrentBreakpoint } = useWindowBreakpoint();

  const schema = yup
    .object({ isPrivate: yup.bool().required().label("Visibility") })
    .required();

  const formData = useForm<IMarketplaceFormResult>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = formData;

  const onClickSubmit = () => {
    handleSubmit((formResponse) => {
      onSubmit({ result: formResponse, formData });
    })();
  };

  return (
    <div className="flex flex-col md:flex-row-reverse justify-center h-[max-content]">
      <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto">
        <Text text="Create Marketplace" type="h3" weight="bold" />
        <form className="mt-s4 md:mt-s8 flex flex-col flex-1">
          <InputSwitch
            id="isPrivate"
            label="Visibility"
            placeholder={`${
              isCurrentBreakpoint("md")
                ? `Tick to set marketplace as private`
                : "Private"
            }`}
            leftIcon="Lock"
            error={errors.isPrivate?.message}
            onClickInput={() => setValue("isPrivate", !getValues("isPrivate"))}
            {...register("isPrivate")}
          />
          <div className="flex flex-1 items-end">
            <Button
              text="Create Marketplace"
              type="primary"
              size="medium"
              className="mt-s20 md:mt-s32"
              onClick={onClickSubmit}
              disabled={disabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMarketplaceTemplate;
