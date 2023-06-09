import { styled, TextField as MuiTextField } from "@mui/material";
import { Colors } from "../../../constants/pallette";

interface Props {
  maxWidth?: string
}

export const TextField = styled(MuiTextField)(({maxWidth}:Props) => ({
  width: "100%",
  backgroundColor: "lightGrey",
  borderRadius: "10px",
  textAlign:"left",
  maxWidth: maxWidth || "auto",
  "& .MuiInputBase-input": {
    color: "black",
    
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Colors.darkGrey,
      borderRadius: "10px",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: Colors.tealc,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.darkGrey,
    },
  },
}));
