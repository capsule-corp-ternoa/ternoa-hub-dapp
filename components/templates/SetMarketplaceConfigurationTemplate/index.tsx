import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Text from "../../atoms/Text";
import {
  ISetMarketplaceConfigurationTemplate,
  IMarketplaceConfigurationFormResult,
} from "./types";
import CreateMarketplaceFilesForm from "../../molecules/SetMarketplaceConfigurationFilesForm";

const SetMarketplaceConfigurationTemplate: React.FC<ISetMarketplaceConfigurationTemplate> =
  ({ onSubmit, disabled }) => {
    const schema = yup
      .object({
        name: yup.string().required().label("Name"),
        marketplaceId: yup
          .number()
          .required()
          .truncate()
          .positive()
          .label("Marketplace Id"),
        comissionFee: yup
          .number()
          .truncate()
          .positive()
          .nullable(true)
          .transform((_, val) => (val !== "" ? Number(val) : null))
          .label("Comission Fee"),
        listingFee: yup
          .number()
          .truncate()
          .positive()
          .nullable(true)
          .transform((_, val) => (val !== "" ? Number(val) : null))
          .label("Listing Fee"),
        logo: yup.mixed().required().label("Logo"),
      })
      .required();

    const formData = useForm<IMarketplaceConfigurationFormResult>({
      resolver: yupResolver(schema),
    });

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

    const onClickSubmit = () => {
      handleSubmit((formResponse) => {
        onSubmit({ result: formResponse, formData });
      })();
    };

    return (
      <div className="flex flex-col md:flex-row-reverse justify-center h-[max-content]">
        <CreateMarketplaceFilesForm
          control={control}
          onSelectLogo={_onSelectLogo}
          logoError={errors.logo?.message}
          className="md:ml-s24"
        />
        <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto">
          <Text text="Set Marketplace Configuration" type="h3" weight="bold" />
          <form className="mt-s4 md:mt-s8 flex flex-col flex-1">
            <Input
              id="name"
              label="Name"
              placeholder="Marketplace's name"
              required={true}
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              id="marketplaceId"
              label="Marketplace ID"
              placeholder="Id of the marketplace to configure"
              required={true}
              inputType="number"
              error={errors.marketplaceId?.message}
              {...register("marketplaceId")}
            />
            <Input
              id="comissionFee"
              label="Comission Fee"
              placeholder="Ex: 8%"
              inputType="number"
              error={errors.comissionFee?.message}
              {...register("comissionFee")}
            />
            <Input
              id="listingFee"
              label="Listing Fee"
              placeholder="Ex: 8%"
              inputType="number"
              error={errors.listingFee?.message}
              {...register("listingFee")}
            />
            <div className="flex flex-1 items-end">
              <Button
                text="Set Configuration"
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

export default SetMarketplaceConfigurationTemplate;
