import React from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface TextProps {
  children: React.ReactNode;
  type?:
    | "h1-bold"
    | "h1-regular"
    | "h2-bold"
    | "h2-regular"
    | "h3-bold"
    | "h3-regular"
    | "body-bold"
    | "body-regular"
    | "body-2-bold"
    | "body-2-regular"
    | "body-3-bold"
    | "body-3-regular"
    | "body-4-bold"
    | "body-4-regular"
    | "font-14-600"
    | "font-16-600"
    | "font-14-400"
    | "font-20-400"
    | "font-48-700"
    | "font-24-600"
    | "font-16-400"
    | "font-24-600"
    | "font-16-500"
    | "font-12-600"
    | "font-32-600"
    | "font-12-600"
    | "font-12-400"
    | "font-40-700"
    | "font-56-700"
    | "font-48-700"
    | "font-16-400-rp"
    | "font-20-400-rp"
    | "font-24-600-rp"
    | "font-16-600-rp"
    | "font-48-700-rp-16"
    | "font-16-400-rp-12"
    | "font-24-600-rp-20"
    | "font-20-600"
    | undefined;
  color?:
    | "cwhite"
    | "cblack"
    | "primary-1"
    | "primary-2"
    | "primary-3"
    | "primary-4"
    | "primary-5"
    | "secondary-1"
    | "secondary-2"
    | "secondary-3"
    | "secondary-4"
    | "secondary-5"
    | "neutral-1"
    | "neutral-2"
    | "neutral-3"
    | "neutral-4"
    | "neutral-5"
    | "neutral-6"
    | "neutral-7"
    | "link-1"
    | "link-2"
    | "link-3"
    | "link-4"
    | "link-5"
    | "text-primary"
    | "secondary"
    | "text-warning"
    | undefined;
  disabled?: boolean;
  state?: null | "disable";
  className?: string;
  onClick?: () => void;
  element?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "span" | "a";
  fontFamily?: string;
  href?: string;
}

const Text: React.FC<TextProps> = ({
  type,
  color,
  disabled = false,
  className = "",
  onClick = () => {},
  children,
  element = "p",
  fontFamily = "font-sora",
  href,
}) => {
  const classes = clsx(type, color, { "text-disable": disabled }, cn(className), fontFamily);

  return React.createElement(
    element,
    {
      className: classes,
      onClick,
      href: href,
    },
    React.createElement(React.Fragment, undefined, children)
  );
};

export default Text;
