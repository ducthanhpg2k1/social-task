import { Textarea } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";

interface IPropsInputTextArea {
  minRows?: number;
  placeholder?: string;
  name: string;
  control: Control;
}

const InputTextArea = (props: IPropsInputTextArea) => {
  const { minRows, placeholder, control, name, ...rest } = props;
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <Textarea
      minRows={minRows}
      placeholder={placeholder}
      name={field?.name}
      onBlur={field.onBlur}
      value={field?.value}
      onChange={field?.onChange}
      classNames={{
        inputWrapper: [
          "border-1",
          "border-neutral-100",
          "bg-neutral-50",
          "border, border-neutral-100 data-[focus=true]:!bg-neutral-50 data-[hover=true]:bg-[#F4F4F5], data-[hover=true]:border-neutral-300 group-data-[focus=true]:border-brand-500",
        ],
      }}
      {...rest}
    />
  );
};
export default InputTextArea;
