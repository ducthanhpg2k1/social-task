import { Input } from "@nextui-org/react";
import Image from "next/image";

const InputSearch = ({ onChange, placeholder }: { onChange: any; placeholder?: string }) => {
  return (
    <Input
      onChange={onChange}
      variant="bordered"
      placeholder={placeholder}
      className="w-auto"
      startContent={<Image src="/icons/ic-search-home.svg" alt="" width={24} height={24} />}
      classNames={{
        base: "bg-transparent",
        inputWrapper: [
          "bg-neutral-50",
          "border-1",
          "border-neutral-100",
          "data-[hover=true]:bg-[#F4F4F5], data-[hover=true]:border-neutral-300 group-data-[focus=true]:border-brand-500",
          "h-[48px]",
          "md:pl-3",
          "md:pr-3",
          "rounded-[100px]",
          "w-[400px]",
          "p-0",
        ],
        innerWrapper: ["bg-transparent h-auto ", "md:pt-4", "md:pb-4", "md:pl-2", "md:pr-2", "px-4", "py-2"],
        input: [
          "bg-transparent",
          "text-primary",
          "placeholder:text-secondary",
          "placeholder:font-sora",
          "font-sora",
          "text-[16px]",
          "leading-[24px]",
          "ps-2",
          "data-[has-start-content=true]:ps-2",
        ],
      }}
    />
  );
};

export default InputSearch;
