import React, { ChangeEvent, useEffect } from 'react'
import {
  Table,
  TableBody,
  TablePagination,
  Box,
  Tooltip,
  Skeleton,
} from '@mui/material'
import { Action } from './Action'
import * as Styled from './styles'
import { TableListAction, Column, ColumnType, Mapper, Props } from './types'
import ImagePreview from '../../components/ImagePreview'
import NoResultsFeedback from '../../components/NoResults'
import { ReactComponent as NoResultsImage } from '~/images/noResults.svg'
import { i18n } from '../../translations/i18n'

export { ColumnType as TableListColType } from './types'
export type {
  TableListAction,
  Column as TableListColumn,
  Mapper as TableListMapper,
  Props as TableListProps,
} from './types'

interface BaseProps {
  id: number
}

const TableList = <T extends BaseProps>({
  title,
  columns,
  rows,
  page,
  perPage,
  totalNumRows,
  rowsPerPageOptions = [10, 25, 100],
  selectedOptions = [],
  orderBy,
  sortBy,
  loading = false,
  enableCheckBox = false,
  enableBulkSelect = false, // TODO: will remove when bulk select is applied to all
  disablePagination,
  onCheckBoxChange = () => undefined,
  onCheckBoxChangeAll = () => undefined,
  onPageChange,
  onOrderChange,
  onNumRowsChange,
  onAction = () => undefined,
  clearFilters,
  hasClearFilter,
  feedBackMessageDescription = i18n.t('filters.noResults.description'),
}: Props<T>) => {
  const [checked, setChecked] = React.useState(false)

  useEffect(() => {
    if (selectedOptions.length === 0) setChecked(false)
  }, [selectedOptions])

  const handleHeaderCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onCheckBoxChangeAll(checked)
    // eslint-disable-next-line no-param-reassign
    setChecked(event.target.checked)
  }

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const obj = JSON.parse(event.target.value)
    onCheckBoxChange(obj)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    onNumRowsChange(+event.target.value)
  }

  const handleSortChange = (newSortBy: string) => {
    let newOrderBy: 'asc' | 'desc'
    if (newSortBy === sortBy) newOrderBy = orderBy === 'asc' ? 'desc' : 'asc'
    else newOrderBy = 'desc'

    onOrderChange(newOrderBy, newSortBy)
  }

  const getColor = (columnValue: string, colorMapping?: Mapper<any>[]) => {
    const color = colorMapping?.find((c) => c.key === columnValue)?.value
    return color || '#F68B1E'
  }

  const formatValue = (
    column: Column,
    value: any,
    id: number,
    colorMapping?: Mapper<any>[],
    row?: any
  ) => {
    switch (column.type) {
      case ColumnType.ActionComponent:
        return (
          <Styled.ActionContainer>
            {Array.isArray(value) ? (
              value.map((action: TableListAction) => (
                <Action
                  key={action.event}
                  {...action}
                  onClick={() => onAction(action.event, id)}
                />
              ))
            ) : (
              <Action
                key={value.event}
                {...value}
                onClick={() => onAction(value.event, id)}
              />
            )}
          </Styled.ActionContainer>
        )
      case ColumnType.Chip: {
        return (
          <Styled.TableChip bgColor={getColor(value, colorMapping)}>
            {value}
          </Styled.TableChip>
        )
      }
      case ColumnType.Image: {
        return <ImagePreview width="50px" height="50px" src={value} />
      }
      case ColumnType.CheckBox: {
        return (
          <Styled.CheckboxContainer
            value={JSON.stringify(value)}
            checked={selectedOptions.includes(value)}
            onChange={handleCheckBoxChange}
          />
        )
      }
      default:
        return column?.format?.(value, row) || value
    }
  }

  const renderBodyCell = (column: Column, value: T[keyof T], row: T) => {
    if (loading) {
      return (
        <Styled.TableCell
          key={column.id}
          align={column.align}
          style={{
            minWidth: column.minWidth,
          }}
        >
          <Skeleton />
        </Styled.TableCell>
      )
    }

    return (
      <Styled.TableCell
        key={column.id}
        align={column.align}
        style={
          column.type === ColumnType.Image ||
            column.type === ColumnType.CheckBox
            ? { width: column.width }
            : { minWidth: column.minWidth }
        }
      >
        <Tooltip
          placement="top-start"
          title={column.hoverMapper?.find((h) => h.key === value)?.value || ''}
        >
          <Box
            display={column.type === ColumnType.ActionComponent ? 'flex' : ''}
            justifyContent={
              column.type === ColumnType.ActionComponent ? 'center' : ''
            }
          >
            {formatValue(column, value, row.id, column.colorMapper, row)}
          </Box>
        </Tooltip>
      </Styled.TableCell>
    )
  }

  const renderHeadCell = (column: Column, index: number) => {
    if (
      enableBulkSelect &&
      enableCheckBox &&
      column.type === ColumnType.CheckBox
    ) {
      return (
        <Styled.TableCell isFirstRow key={index}>
          <Styled.CheckboxContainer
            checked={checked}
            onChange={handleHeaderCheckBoxChange}
          />
        </Styled.TableCell>
      )
    }

    return (
      <Styled.TableCell
        isFirstRow
        key={column.id}
        align={
          column.type === ColumnType.ActionComponent ? 'center' : column.align
        }
        style={{ minWidth: column.minWidth }}
      >
        {column.sortable ? (
          <Styled.TableSortLabel
            active={sortBy === column.id}
            direction={sortBy === column.id ? orderBy : 'asc'}
            isSortableAction={
              column.sortable && column.type === ColumnType.ActionComponent
            }
            onClick={() => handleSortChange(column.id)}
          >
            {column.label}
          </Styled.TableSortLabel>
        ) : (
          column.label
        )}
      </Styled.TableCell>
    )
  }

  const renderBodyRow = (row: any) => {
    const id = columns[0].id as keyof T
    const isChecked = enableCheckBox && selectedOptions.includes(row[id] as any)

    return (
      <Styled.TableRow
        isChecked={isChecked}
        hover={!isChecked}
        role="checkbox"
        tabIndex={-1}
        key={row.id}
      >
        {columns.map((column) => {
          const columnId = column.id as keyof T
          const value = row[columnId]

          return renderBodyCell(column, value, row)
        })}
      </Styled.TableRow>
    )
  }

  return (
    <Styled.TableBox>
      <Styled.TableContainer>
        <Styled.TableTitle>{title}</Styled.TableTitle>
        <Table aria-label="sticky table">
          <Styled.TableHead title={title}>
            <Styled.TableRow>
              {columns.map((column, index) => renderHeadCell(column, index))}
            </Styled.TableRow>
          </Styled.TableHead>

          <TableBody>{rows.map((row) => renderBodyRow(row))}</TableBody>
        </Table>
      </Styled.TableContainer>
      {rows.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          color="#C9C9C9"
          py="10px"
          fontSize="14px"
          border="2px solid #E6E6E9"
        >
          <NoResultsFeedback
            description={feedBackMessageDescription}
            image={<NoResultsImage />}
            clearFilters={clearFilters}
            hasClearFilter={hasClearFilter}
            loading={loading}
          />
        </Box>
      )}
      {!disablePagination && (
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalNumRows}
          rowsPerPage={perPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Styled.TableBox>
  )
}

export default TableList
