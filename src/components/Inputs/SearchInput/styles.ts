import { InputBase, styled } from '@mui/material'

interface ContentContainerProps {
  border: string
}

export const CustomSearchInput = styled(InputBase)<ContentContainerProps>(
  ({ border }) => ({
    background: 'white',
    borderRadius: '5px',
    border,
    paddingInline: '20px',
    color: '#75757A',
    height: '56px',
  })
)
