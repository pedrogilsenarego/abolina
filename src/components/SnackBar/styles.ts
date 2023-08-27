import { Box as MuiBox, styled } from "@mui/material";
import { Colors } from "../../constants/pallette";

interface Props {
  bgcolor: string;
  notificationType: string;
}

export const Box = styled(MuiBox)(({ bgcolor, notificationType }: Props) => ({
  width: "100%",
  backgroundColor: bgcolor ? bgcolor : "white",
  padding: "2px 10px",
  borderRadius: "12px",
  border: `2px solid ${notificationType === "success" ? Colors.tealc : "red"}`,
  justifyContent: "center",
  alignItems: "center",
  color: Colors.tealc,
  display: "flex",
  columnGap: "10px",
}));
