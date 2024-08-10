import { Input } from "@nextui-org/react";
import React, { ReactNode } from "react";
import Text from "./Text";
import { Control, useController, useForm } from "react-hook-form";
import clsx from "clsx";

interface IInputText {
  startContent?: ReactNode;
  endContent?: ReactNode;
  label?: string | ReactNode;
  placeholder?: string;
  control: Control;
  name: string;
  className?: string;
  required?: boolean;
  errors?: any;
  readOnly?: boolean;
  defaultValue?: any;
  isDisabled?: boolean;
  type?: any;
  size?: any;
}
const InputText = (props: IInputText) => {
  const {
    startContent,
    endContent,
    label,
    errors,
    placeholder,
    type,
    className = "",
    control,
    readOnly,
    isDisabled,
    required,
    defaultValue,
    name,
    ...rest
  } = props;
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div className="flex flex-col gap-1">
      <Input
        startContent={startContent}
        endContent={endContent}
        name={field?.name}
        type={type}
        onBlur={field.onBlur}
        isDisabled={isDisabled}
        value={field?.value}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onChange={field?.onChange}
        radius="full"
        className={clsx("rounded-full", {
          [className]: !!className,
        })}
        label={
          <>
            {label || (
              <Text type="font-14-400" className="text-primary">
                {label}
              </Text>
            )}
          </>
        }
        classNames={{
          inputWrapper: [
            "border-1",
            readOnly ? "bg-neutral-100 opacity-1" : "bg-neutral-50",
            errors?.[name]?.message ? "!border-error-500" : "border-neutral-100",
            readOnly
              ? "data-[hover=true]:border-neutral-100,  data-[hover=true]:bg-neutral-100, group-data-[focus=true]:border-neutral-100, group-data-[focus=true]:bg-neutral-100"
              : "border, border-neutral-100 data-[hover=true]:bg-[#F4F4F5], data-[hover=true]:border-neutral-300 data-[focus=true]:!bg-neutral-50 group-data-[focus=true]:border-brand-500",
            startContent ? "px-3" : "px-4",
          ],
          input: [readOnly ? "!text-secondary" : "!primary"],
        }}
        placeholder={placeholder}
        labelPlacement="outside"
        {...rest}
      />
      {errors?.[name]?.message && required && (
        <Text type="font-14-400" className="text-error-500">
          {errors?.[name]?.message}
        </Text>
      )}
    </div>
  );
};
export default InputText;
