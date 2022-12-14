import { styled, Box as MuiBox } from "@mui/material";

interface Props {
  bgcolor: string;
}

export const Box = styled(MuiBox)(({ bgcolor }: Props) => ({
  width: "100%",
  backgroundColor: bgcolor ? bgcolor : "black",
  padding: "10px",
  borderRadius: "4px",
  justifyContent: "center",
  alignItems: "center",
  color: "white"
}));
