import { styled, Typography } from "@mui/material"
import { Colors } from "../constants/pallette"

interface TitleProps {
  fontSize?: string
}

export const Title = styled(Typography)(({ fontSize }: TitleProps) => ({
  color: Colors.tealc,
  fontSize: fontSize || "28px",
  fontWeigth: 700
}))