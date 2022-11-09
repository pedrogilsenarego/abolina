import { Box, styled } from '@mui/material'

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80%',
}))

export const ImageContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '150px',
}))
