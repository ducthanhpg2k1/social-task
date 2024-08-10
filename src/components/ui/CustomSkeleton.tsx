import { useTheme } from "@/hooks/useTheme";
import { Skeleton } from "@nextui-org/react";
import clsx from "clsx";

const CustomSkeleton = ({
  className = "",
  children,
  loading,
}: {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <>
      {loading && (
        <Skeleton
          className={clsx("!duration-1000 before:!duration-1000 rounded-full !bg-neutral-300", {
            ["dark:before:via-neutral-500/10 before:to-transparent"]: theme === "dark",
            ["before:via-white/40"]: theme === "light",
            [className]: !!className,
          })}
        >
          {children}
        </Skeleton>
      )}
      {!loading && children}
    </>
  );
};

export default CustomSkeleton;
