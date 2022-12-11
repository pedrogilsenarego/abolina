import { Box, styled } from '@mui/material'

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.common.white,
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    maxWidth: '325px',
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '475px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}))

export const SelectContainer = styled(Box)(() => ({
  minWidth: 120,
}))
