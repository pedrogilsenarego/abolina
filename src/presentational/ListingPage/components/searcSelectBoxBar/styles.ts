import { Box, styled } from '@mui/material'

export const SearchBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
  },
}))

export const DateRangeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))
