import { styled, TextField as MuiTextField } from "@mui/material";
import { Colors } from "../../../constants/pallette";

export const TextField = styled(MuiTextField)(() => ({
  width: "100%",

  "& .MuiInputBase-input": {
    color: "whiteSmoke",
    
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Colors.tealc,
      borderRadius: "4px",
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
