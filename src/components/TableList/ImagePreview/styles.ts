import { styled, Box, CardMedia as MuiCardMedia } from '@mui/material'

export const Container = styled(Box)(() => ({
  borderRadius: '3px',
  height: "50px",
  width: "80px"
}))

export const CardMedia = styled(MuiCardMedia)(() => ({
  height: "50px",
  width: "50px",
  borderRadius: "3px",
}))
