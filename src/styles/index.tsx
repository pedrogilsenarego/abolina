import { styled, Typography } from "@mui/material";
import { Colors } from "../constants/pallette";

interface TitleProps {
  fontSize?: string;
  color?: string;
}

export const Title = styled(Typography)(({ fontSize, color }: TitleProps) => ({
  color: color || Colors.tealc,
  fontSize: fontSize || "28px",
  fontWeigth: "bold",
  textAlign: "left",
}));

export const SubTitle = styled(Typography)(() => ({
  color: Colors.darkGrey,
  fontSize: "20px",
  fontWeigth: "bold",
}));
