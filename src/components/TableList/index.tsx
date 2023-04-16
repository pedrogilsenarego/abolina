import {
  Table,
  TableHead,
  TableRow,
  TableSortLabel,
  TableBody,
  Skeleton,
  Tooltip,
  Box,
} from "@mui/material";
import { Column, ColumnType, ClickType } from "./types";
import * as Styled from "./styles";
import useTableList from "./useTableList";

interface Props<T> {
  columns: Column[];
  rows: T[];
  enableCheckBox?: boolean;
  enableBulkSelect?: boolean;
  onCheckBoxChangeAll?: (checked: boolean) => void;
  selectedOptions?: number[];
  loading?: boolean;
  onAction: (type: string, id: number, value?: any) => void;
  onCheckBoxChange?: (data: any) => void;
}

interface BaseProps {
  id: number;
  productID: string;
}

const TableList = <T extends BaseProps>({
  columns,
  enableCheckBox = false,
  enableBulkSelect = false,
  onCheckBoxChangeAll,
  rows,
  selectedOptions = [],
  loading = false,
  onAction,
  onCheckBoxChange = () => undefined,
}: Props<T>) => {
  const { checked, handleHeaderCheckBoxChange, formatValue, navigate } =
    useTableList({
      onCheckBoxChangeAll,
      onAction,
      selectedOptions,
      onCheckBoxChange,
    });



  const renderHeadCell = (column: Column) => {
    if (
      enableBulkSelect &&
      enableCheckBox &&
      column.type === ColumnType.CheckBox
    ) {
      return (
        <Styled.TableCell isFirstRow>
          <Styled.CheckboxContainer
            checked={checked}
            onChange={handleHeaderCheckBoxChange}
          />
        </Styled.TableCell>
      );
    }

    return (
      <Styled.TableCell
        isFirstRow
        key={column.id}
        align={
          column.type === ColumnType.ActionComponent ? "center" : column.align
        }
        style={{ minWidth: column.minWidth }}
      >
        {column.sortable ? (
          <TableSortLabel>{column.label}</TableSortLabel>
        ) : (
          column.label
        )}
      </Styled.TableCell>
    );
  };

  const renderBodyCell = (column: Column, value: T[keyof T], row: T) => {
    if (loading) {
      return (
        <Styled.TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          <Skeleton />
        </Styled.TableCell>
      );
    }

    return (
      <Styled.TableCell
        onClick={
          column.onClick === ClickType.visitProduct
            ? () => {
              navigate(`/product/${row.productID}`);
            }
            : undefined
        }
        key={column.id}
        align={column.align}
        style={
          column.type === ColumnType.Image ||
            column.type === ColumnType.CheckBox
            ? { width: column.width }
            : {
              minWidth: column.minWidth,
            }
        }
      >
        <Tooltip
          placement='top-start'
          title={column.hoverMapper?.find((h) => h.key === value)?.value || ""}
        >
          <Box
            component='div'
            display={column.type === ColumnType.ActionComponent ? "flex" : ""}
            justifyContent={
              column.type === ColumnType.ActionComponent ? "center" : ""
            }
          >
            {formatValue(column, value, row.id, column.colorMapper)}
          </Box>
        </Tooltip>
      </Styled.TableCell>
    );
  };

  const renderBodyRow = (row: any) => {
    const id = columns[0].id as keyof T;
    const checked =
      enableCheckBox && selectedOptions.includes(row[id] as any);
    return (
      <Styled.TableRow
        checked={checked}
        hover={!checked}
        role='checkbox'
        tabIndex={-1}
        key={row.id}
      >
        {columns.map((column) => {
          const columnId = column.id as keyof T;
          const value = row[columnId];
          return renderBodyCell(column, value, row);
        })}
      </Styled.TableRow>
    );
  };

  return (
    <Styled.TableContainer >
      <Table aria-label='sticky table' size='small'>
        <TableHead>
          <TableRow>{columns.map((column) => renderHeadCell(column))}</TableRow>
        </TableHead>
        <TableBody>{rows.map((row) => renderBodyRow(row))}</TableBody>
      </Table>
    </Styled.TableContainer>
  );
};

export default TableList;
