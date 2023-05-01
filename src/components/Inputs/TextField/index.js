import { useEffect } from "react";
import * as Styled from "./styles";
import { Typography, Box } from "@mui/material";

const Textfield = ({
  maxWidth = "auto",
  placeholder = "",
  label = "",
  password = false,
  multiline = false,
  rows = 0,
  getValue = (value) => value,
  setValue = "",
  ...otherProps
}) => {
  const configTextField = {
    ...otherProps,

    fullWidth: true,
    variant: "outlined",
  };

  useEffect(() => {}, [setValue]);

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='start'
        justifyContent='start'
        style={{ position: "relative" }}
      >
        <Typography style={{ position: "absolute", top: "-23px", left: "5px" }}>
          {label}
        </Typography>

        <Styled.TextField
          style={{ caretColor: "white" }}
          type='text'
          maxWidth
          value={setValue}
          multiline={multiline ? multiline : null}
          rows={rows ? rows : null}
          size='small'
          placeholder={placeholder}
          {...configTextField}
          onChange={(e) => getValue(e.target.value)}
        />
      </Box>
    </>
  );
};

export default Textfield;
