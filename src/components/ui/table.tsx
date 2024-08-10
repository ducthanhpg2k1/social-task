/* eslint-disable react-hooks/rules-of-hooks */
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import { Info } from "@phosphor-icons/react";
import clsx from "clsx";
import React, { ReactNode } from "react";
import CustomTooltip from "./CustomTooltip";
import Text from "./Text";

const classNames = {
  wrapper: ["py-3", "p-0", "bg-background-primary", "shadow-none"],
  th: [
    "bg-transparent",
    "text-secondary",
    "text-[14px]",
    "leading-[21px]",
    "border-b",
    "border-neutral-100",
    "font-normal",
  ],
  td: ["py-[1rem] pr-[1rem] md:pr-0"],
};

export interface IColumns {
  key: string;
  label: string;
  width?: number | string;
  tooltip?: boolean;
  messageTooltip?: string;
}

interface ITableProps {
  columns: IColumns[];
  dataSource?: any;
  emptyContent?: ReactNode;
  loading?: boolean;
  renderCell?: any;
  isStriped?: boolean;
}
const TableCustom = (props: ITableProps) => {
  const { columns, dataSource, emptyContent, loading = false, renderCell, isStriped = false } = props;

  return (
    <Table isStriped={isStriped} classNames={classNames} isCompact>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn width={400} key={column.key}>
            <div className="flex items-center gap-1">
              {column.label}
              {column?.tooltip && (
                <CustomTooltip
                  text={
                    <Text type="font-14-400" className="text-white">
                      {column?.messageTooltip}
                    </Text>
                  }
                >
                  <Info size={20} className="text-secondary cursor-pointer" />
                </CustomTooltip>
              )}
            </div>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        loadingContent={<Spinner color="success" />}
        isLoading={loading}
        emptyContent={emptyContent || "No users found"}
        items={dataSource?.map((item: any, index: any) => {
          return {
            key: index,
            ...item,
          };
        })}
      >
        {(item: any) => {
          const animationDelay = `${Number(item?.key) * 0.05}s`;
          return (
            <TableRow
              key={item.key}
              className={clsx("animate-tableRow ease-expo transition-all duration-300 opacity-0")}
              style={{ animationDelay: animationDelay }}
            >
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};
export default TableCustom;
