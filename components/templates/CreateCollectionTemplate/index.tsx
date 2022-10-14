import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Accept } from "react-dropzone";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text";
import Textarea from "../../atoms/Textarea";
import { ICreateCollectionTemplate, ICollectionFormResult } from "./types";
import InputSwitch from "../../atoms/InputSwitch";
import CreateCollectionFilesForm from "../../molecules/CreateCollectionFilesForm";
import { useWindowBreakpoint } from "../../../hooks/useWindowBreakpoint";

const CreateCollectionTemplate: React.FC<ICreateCollectionTemplate> = ({
  onSubmit,
  disabled,
}) => {
  const schema = yup
    .object({
      name: yup.string().required().label("Name"),
      description: yup.string().required().label("Description"),
      isSensitive: yup.bool().required().label("Sensitive content"),
      logo: yup.mixed().required().label("Logo"),
      banner: yup.mixed().required().label("Banner"),
      categories: yup.string().label("Categories"),
      limit: yup
        .number()
        .truncate()
        .positive()
        .nullable(true)
        .transform((_, val) => (val !== "" ? Number(val) : null))
        .label("Limit"),
    })
    .required();

  const formData = useForm<ICollectionFormResult>({
    resolver: yupResolver(schema),
  });
  const { isCurrentBreakpoint } = useWindowBreakpoint();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    control,
  } = formData;

  const _onSelectLogo = (file: File) => {
    clearErrors("logo");
    setValue("logo", file);
  };

  const _onSelectBanner = (file: File) => {
    clearErrors("banner");
    setValue("banner", file);
  };

  const onClickSubmit = () => {
    handleSubmit((formResponse) => {
      onSubmit({ result: formResponse, formData });
    })();
  };

  return (
    <div className="flex flex-col md:flex-row-reverse justify-center h-[max-content]">
      <CreateCollectionFilesForm
        control={control}
        onSelectBanner={_onSelectBanner}
        onSelectLogo={_onSelectLogo}
        logoError={errors.logo?.message}
        bannerError={errors.banner?.message}
        className="md:ml-s24"
      />
      <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto">
        <Text text="Create your Collection" type="h3" weight="bold" />
        <form className="mt-s4 md:mt-s8 flex flex-col flex-1">
          <Input
            id="name"
            label="Name"
            placeholder="Collection's name"
            required={true}
            error={errors.name?.message}
            {...register("name")}
          />
          <Textarea
            id="description"
            label="Description"
            required={true}
            placeholder="Tell about the collection in a few words"
            rows={5}
            style={{ resize: "none" }}
            error={errors.description?.message}
            {...register("description")}
          />
          <InputSwitch
            id="isSensitive"
            label="Senstive content"
            placeholder={`${
              isCurrentBreakpoint("md")
                ? `Tick if your collection contains NSFW`
                : "Contains NSFW"
            }`}
            leftIcon="WarningCircle"
            error={errors.isSensitive?.message}
            onClickInput={() =>
              setValue("isSensitive", !getValues("isSensitive"))
            }
            {...register("isSensitive")}
          />
          <Input
            id="limit"
            label="Limit"
            placeholder="Maximum amount of NTFs available"
            inputType="number"
            error={errors.limit?.message}
            {...register("limit")}
          />
          <div className="flex flex-1 items-end">
            <Button
              text="Create Collection"
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

export default CreateCollectionTemplate;
