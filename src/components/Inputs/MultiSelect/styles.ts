import { styled, Select as MuiSelect } from "@mui/material";
import { Colors } from "../../../constants/pallette";

interface Props {
  maxWidth?: string;
}

export const Select = styled(MuiSelect)(({ maxWidth }: Props) => ({
  width: "100%",
  backgroundColor: "lightGrey",
  borderRadius: "10px",
  border: `solid 2px ${Colors.darkGrey}`,
  maxWidth: maxWidth || "auto",
  "& .MuiSelect-select": {
   
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
