import { styled, Box as MuiBox } from "@mui/material";

interface Props {
  bgColor: string;
}

export const Box = styled(MuiBox)(({ bgColor }: Props) => ({
  width: "100%",
  backgroundColor: bgColor ? bgColor : "black",
  padding: "10px",
  borderRadius: "4px",
  justifyContent: "center",
  alignItems: "center",
}));
