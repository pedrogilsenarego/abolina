import { TextField as MuiTextField, styled } from "@mui/material";
import { Colors } from "../../../constants/pallette";

interface Props {
  maxWidth: string;
}

export const TextField = styled(MuiTextField)(({ maxWidth }: Props) => ({
  width: "100%",
  backgroundColor: "lightGrey",
  marginTop: "5px",
  borderRadius: "10px",
  maxWidth: maxWidth || "auto",
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Colors.darkGrey,
      borderRadius: "12px",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: Colors.tealc,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.tealc,
    },
  },
}));
