import { styled, Checkbox, TableRow as MuiTableRow, BoxProps, TableCell as MuiTableCell, TableContainer as MuiTableContainer, TableCellProps as MuiTableCellProps, Box } from "@mui/material"

export const CheckboxContainer = styled(Checkbox)({
  height: '24px',
})

export const TableContainer = styled(MuiTableContainer)(() => ({
  
  position: 'relative',
  minWidth: "60vw",
  maxHeight: '90%',
  padding: "10px",
  
}))

interface TableRowProps {
  checked?: boolean
}

export const TableRow = styled(MuiTableRow)(({ checked }:TableRowProps) => ({
  background: checked ? '#FFF7DF' : 'transparent',
  color: '#333333',
}))

interface TableCellProps extends MuiTableCellProps {
  isFirstRow?: boolean;
  onClick?:any
}

export const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'isFirstRow',
})<TableCellProps>(({ isFirstRow, onClick }) => ({
  borderBottom: '1px solid #E6E6E9',
  fontSize: isFirstRow ? '14px' : '14px',
  paddingInline: '27px',
  paddingTop: isFirstRow ? '16px' : '8px',
  paddingBottom: isFirstRow ? '10px' : '8px',
  color: "black !important",
  cursor: onClick?"pointer": "default"
}))

export const ActionContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
})

interface TableChipProps extends BoxProps {
  bgColor?: string;
}

export const TableChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFirstRow',
})<TableChipProps>(({ bgColor }) => ({
  fontSize: '14px',
  borderRadius: '12px',
  padding: '5px 10px',
  display: 'initial',
  textAlign: 'center',
  backgroundColor: bgColor,
  color: 'white',
}))