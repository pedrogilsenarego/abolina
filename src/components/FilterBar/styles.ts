import { styled } from '@mui/system'

export const FilterLabel = styled('label')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 'inherit',
  lineHeight: '20px',
}))

export const Span = styled('span')(() => ({
  fontWeight: 'bold',
  color: '#B2B2BC',
  fontSize: '85%',
}))

export const SelectedOptionItem = styled('button')(({ theme }) => ({
  color: 'white',
  borderRadius: '9px',
  backgroundColor: theme.palette.primary.main,
  textAlign: 'center',
  fontSize: 'inherit',
  padding: theme.spacing(0.125, 1),
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    borderRadius: theme.spacing(1),
  },
}))

export const UnselectedOptionItem = styled('button')(({ theme }) => ({
  color: 'gray',
  borderRadius: '9px',
  backgroundColor: '#EDEEEF',
  textAlign: 'center',
  padding: theme.spacing(0.125, 1),
  fontSize: 'inherit',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    borderRadius: theme.spacing(1),
  },
}))
