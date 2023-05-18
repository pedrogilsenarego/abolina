import { styled, Typography } from "@mui/material"
import { Colors } from "../constants/pallette"

interface TitleProps {
  fontSize?: string
  color?: string

}

export const Title = styled(Typography)(({ fontSize, color }: TitleProps) => ({
  color: color || Colors.tealc,
  fontSize: fontSize || "28px",
  fontWeigth: 800
}))

export const SubTitle = styled(Typography)(() => ({
  color: "black",
  fontSize: "14px",
  fontWeigth: 700
}))