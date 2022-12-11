import { Box, styled } from '@mui/material'

export const FilterBox = styled(Box)(({ theme }) => ({
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  background: 'white',
  borderTop: '2px solid',
  borderColor: theme.palette.primary.main,
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(1, 1.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 0.75),
  },
  width: '100%',
}))
