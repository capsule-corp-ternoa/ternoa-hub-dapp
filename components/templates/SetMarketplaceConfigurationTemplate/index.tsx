import React, { useState } from "react";
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
import ButtonToggle from "../../atoms/ButtonToggle";
import { FeeType } from "../../../types";
import Label from "../../atoms/Label";
import AccountsModal from "../../organisms/modals/AccountsModal";
import AccountListItem from "../../molecules/AccountListItem";
import ColorInput from "../../atoms/ColorInput";
import { MarketplaceKind } from "ternoa-js/marketplace/enum";

const SetMarketplaceConfigurationTemplate: React.FC<ISetMarketplaceConfigurationTemplate> =
  ({
    onSubmit,
    disabled,
    data,
    defaultMarketplaceId,
    defaultKind,
    ipfsData,
    logo,
  }) => {
    const feeOptions = [
      { label: "%", value: FeeType.Percentage },
      { label: "CAPS", value: FeeType.Flat },
    ];

    const [commissionFeeType, setCommissionFeeType] = useState<FeeType>(
      data?.commissionFeeType || FeeType.Percentage
    );
    const [listingFeeType, setListingFeeType] = useState<FeeType>(
      data?.listingFeeType || FeeType.Percentage
    );
    const [accounts, setAccounts] = useState<string[]>(data?.accountList || []);
    const [isAccountsModalVisible, setIsAccountsModalVisible] =
      useState<boolean>(false);

    const schema = yup
      .object({
        name: yup.string().required().label("Name"),
        mainColor: yup
          .string()
          .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "The color must be on hexadecimal value, ex: #AA00AA",
            excludeEmptyString: true,
          })
          .label("Main Color"),
        marketplaceId: yup
          .number()
          .required()
          .truncate()
          .positive()
          .label("Marketplace Id"),
        commissionFee: yup.lazy(() => {
          let validation = yup
            .number()
            .truncate()
            .positive()
            .nullable(true)
            .transform((_, val) => (!!val ? Number(val) : null))
            .label("Commission Fee");
          if (commissionFeeType === FeeType.Percentage) {
            return validation.max(100);
          } else {
            return validation;
          }
        }),
        listingFee: yup.lazy(() => {
          let validation = yup
            .number()
            .truncate()
            .positive()
            .nullable(true)
            .transform((_, val) => (!!val ? Number(val) : null))
            .label("Listing Fee");
          if (listingFeeType === FeeType.Percentage) {
            return validation.max(100);
          } else {
            return validation;
          }
        }),
        logo: yup.mixed().required().label("Logo"),
      })
      .required();

    const formData = useForm<IMarketplaceConfigurationFormResult>({
      resolver: yupResolver(schema),
      defaultValues: {
        ...data,
        name: ipfsData?.name,
        mainColor: ipfsData?.mainColor,
        logo: logo,
        marketplaceId: data ? parseInt(data.id) : defaultMarketplaceId,
      },
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
      clearErrors,
      setValue,
      control,
    } = formData;

    const _onSelectLogo = (file: File) => {
      clearErrors("logo");
      setValue("logo", file);
    };

    const onSelectCommissionFeeType = (value: FeeType) => {
      clearErrors("commissionFee");
      setCommissionFeeType(value);
    };

    const onSelectListingFeeType = (value: FeeType) => {
      clearErrors("listingFee");
      setListingFeeType(value);
    };

    const onPressDeleteAccount = (accountIndex: number) => {
      setAccounts((_accounts) =>
        _accounts.filter((_a, i) => i !== accountIndex)
      );
    };

    const onClickSubmit = () => {
      handleSubmit((formResponse) => {
        onSubmit({
          result: {
            ...formResponse,
            accounts,
            commissionFeeType,
            listingFeeType,
          },
          formData,
        });
      })();
    };

    return (
      <React.Fragment>
        <AccountsModal
          isOpened={isAccountsModalVisible}
          accounts={accounts}
          onChange={setAccounts}
          onClose={() => setIsAccountsModalVisible(false)}
        />
        <div className="flex flex-col md:flex-row-reverse justify-center h-[max-content]">
          <div className="h-[fit-content]">
            <CreateMarketplaceFilesForm
              control={control}
              onSelectLogo={_onSelectLogo}
              logoError={errors.logo?.message}
              className="md:ml-s24 md:mb-s24"
            />
            <div
              className={`bg-gray-500 px-s16 md:px-s32 pb-s28 md:pb-s32 pt-[18px] rounded-[20px] text-left md:w-auto md:mb-[0px] mb-s32 pt-s8 h-[fit-content] md:ml-s24`}
            >
              <ColorInput
                id="mainColor"
                label="Main Color"
                placeholder="Ex: #000000"
                inputContainerClassName="md:w-fit"
                className="md:w-[242px] w-full"
                error={errors.mainColor?.message}
                initialValue={ipfsData?.mainColor}
                {...register("mainColor")}
              />
            </div>
          </div>
          <div className="bg-gray-500 px-s16 md:px-s32 py-s28 md:py-s32 rounded-[20px] w-full md:inline-flex md:flex-col md:w-auto">
            <Text
              text="Set Marketplace Configuration"
              type="h3"
              weight="bold"
            />
            <form className="mt-s4 md:mt-s8 flex flex-col flex-1">
              <Input
                id="marketplaceId"
                label="Marketplace ID"
                placeholder="Id of the marketplace to configure"
                required={true}
                disabled={true}
                type="disabled"
                inputType="number"
                error={errors.marketplaceId?.message}
                {...register("marketplaceId")}
              />
              <Input
                id="name"
                label="Name"
                placeholder="Marketplace's name"
                required={true}
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                id="commissionFee"
                rightComponentClassname="top-[8%] right-s4"
                rightComponent={
                  <ButtonToggle
                    options={feeOptions}
                    selectedIndex={feeOptions.findIndex(
                      (fee) => commissionFeeType === fee.value
                    )}
                    optionClassName="min-w-[50px] md:py-s2 py-s2"
                    className="p-s4"
                    onChange={(value) => onSelectCommissionFeeType(value)}
                  />
                }
                label="Commission Fee"
                placeholder="Ex: 10, 20, 30"
                inputType="number"
                error={errors.commissionFee?.message}
                {...register("commissionFee")}
              />
              <Input
                id="listingFee"
                rightComponentClassname="top-[8%] right-s4"
                rightComponent={
                  <ButtonToggle
                    options={feeOptions}
                    selectedIndex={feeOptions.findIndex(
                      (fee) => listingFeeType === fee.value
                    )}
                    optionClassName="min-w-[50px] md:py-s2 py-s2"
                    className="p-s4"
                    onChange={(value) => onSelectListingFeeType(value)}
                  />
                }
                label="Listing Fee"
                placeholder="Ex: 10, 20, 30"
                inputType="number"
                error={errors.listingFee?.message}
                {...register("listingFee")}
              />
              {(data?.kind || defaultKind) === MarketplaceKind.Private && (
                <div className="flex flex-col py-[10px] md:py-[12px]">
                  <Label text="Account List" />
                  <div className="bg-gray-100 md:px-s24 md:py-s16 px-[12px] py-s8 rounded-xl rounded-l-none border-l-4 border-solid border-gray-300 md:w-[504px]">
                    {!!accounts.length && (
                      <div className="w-full md:w-[456px] mb-s16">
                        {accounts.map((account, index) => (
                          <AccountListItem
                            pubKey={account}
                            key={account}
                            onDelete={() => onPressDeleteAccount(index)}
                            className={"mt-s8"}
                          />
                        ))}
                      </div>
                    )}
                    <Button
                      text="+ Add"
                      type="primary"
                      size="small"
                      onClick={() => setIsAccountsModalVisible(true)}
                      className={"w-fit !min-w-[auto]"}
                    />
                  </div>
                </div>
              )}
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
      </React.Fragment>
    );
  };

export default SetMarketplaceConfigurationTemplate;
