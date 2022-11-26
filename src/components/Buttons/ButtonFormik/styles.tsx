import { Button as MuiButton, styled } from "@mui/material";
import { Colors } from "../../../constants/pallette";



export const Button = styled(MuiButton)(() => ({
  backgroundColor: Colors.tealc,
  color: "white",
  borderRadius: "40px",
  paddingLeft: "20px",
  paddingRight: "20px",
}));
