import { styled, TextField as MuiTextField } from "@mui/material";
import { Colors } from "../../../constants/pallette";

interface Props {
  maxWidth?: string;
  height?: string;
}

export const TextField = styled(MuiTextField)(({ maxWidth, height }: Props) => ({
  width: "100%",
  backgroundColor: "white",
  borderRadius: "4px",
  maxWidth: maxWidth || "auto",
  "& .MuiInputBase-input": {
    color: "black",
    height: height || "auto", // Set the height here
   
   
    
  },
  "& .MuiInputBase-root": {
    height: height || "auto",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Colors.darkGrey,
      borderRadius: "4px",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: Colors.tealc,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.tealc,
    },
  },
}));
