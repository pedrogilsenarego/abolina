import styled from '@emotion/styled'
import { Grid } from '@mui/material'

export const FilterLabel = styled('label')({
  color: '#F68B1E',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '20px',
})

export const Span = styled('span')({
  fontSize: '12px',
  paddingRight: '10px',
  fontWeight: 'bold',
  color: '#B2B2BC',
})

export const SelectedOptionItem = styled(Grid)({
  color: 'white',
  borderRadius: '9px',
  backgroundColor: 'primary.main',
  margin: '0px 0px',
  textAlign: 'center',
  fontSize: '12px',
  padding: '1px 8px',
  fontWeight: 'bold',
  cursor: 'pointer',
})

export const UnselectedOptionItem = styled(Grid)({
  color: 'gray',
  borderRadius: '9px',
  backgroundColor: '#EDEEEF',
  margin: '0px 8px',
  textAlign: 'center',
  fontSize: '12px',
  padding: '1px 8px',
  fontWeight: 'bold',
  cursor: 'pointer',
})
