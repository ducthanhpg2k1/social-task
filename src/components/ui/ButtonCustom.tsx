// MyButton.tsx
import { extendVariants, Button } from "@nextui-org/react";

export const ButtonCustom = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      olive: "text-[#000] bg-[#84cc16] font-sora",
      orange: "bg-[#ff8c00] text-[#fff] font-sora",
      violet: "bg-[#8b5cf6] text-[#fff] font-sora",
      green: "bg-brand-500 text-[#fff] font-medium font-sora font-semibold",
      danger: "bg-[#FF453A1A] text-[#FF453A] rounded-full font-sora font-semibold",
    },
    variant: {
      bordered: "border border-neutral-100 text-secondary text-[16px] font-semibold leading-[20px]",
    },
    isDisabled: {
      true: "cursor-not-allowed",
    },
    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-full",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-full",
      xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-full",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    // color: "green",
    // size: "md",
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      isDisabled: true,
      color: "olive",
      class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});
