import { styled, TextField as MuiTextField } from "@mui/material";
import { Colors } from "../../../constants/pallette";

export const TextField = styled(MuiTextField)(() => ({
  

  "& .MuiInputBase-input": {
    color: "whiteSmoke",
    
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Colors.tealc,
      borderRadius: "12px",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "orange",
    },
    "&.Mui-focused fieldset": {
      borderColor: "orange",
    },
  },
}));
