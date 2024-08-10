import { cn } from "@/lib/utils";
import { Pagination, PaginationItemType } from "@nextui-org/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React from "react";

export default function CustomPagination({
  total,
  page,
  onChangePage,
}: {
  total: number;
  page: number;
  onChangePage?: (page: number) => void;
}) {
  const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage, className }: any) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={cn(className, "bg-neutral-50 p-[10px]  w-10 h-10 !rounded-full")} onClick={onNext}>
          <CaretRight className="text-primary" size={20} />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-neutral-50 p-[10px] w-10 h-10  !rounded-full")}
          onClick={onPrevious}
        >
          <CaretLeft className="text-primary" size={20} />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={cn(className, "bg-transparent outline-none shadow-none")}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        key={key}
        className={cn(
          className,
          "bg-transparent outline-none shadow-none text-[16px] leading-[24px] font-normal text-secondary font-sora",
          isActive &&
            "bg-brand-500 !rounded-full w-10 h-10 text-white text-[16px] leading-[32px] font-semibold font-sora"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };
  return (
    <Pagination
      onChange={(page) => {
        onChangePage && onChangePage(page);
      }}
      disableCursorAnimation
      showControls
      total={total}
      initialPage={1}
      page={page}
      classNames={{
        base: ["gap-2 p-0 flex justify-center items-center mt-6", `${total === 0 && "hidden"}`],
        wrapper: "gap-2 md:gap-3",
      }}
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
}
