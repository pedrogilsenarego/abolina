import * as Styled from "./styles";
import { useState } from "react";
import { Typography, Box } from "@mui/material";

const Textfield = ({
  maxWidth = "auto",
  placeholder = "",
  label,
  password = false,
  multiline = false,
  rows = 0,
  ...otherProps
}) => {
  const configTextField = {
    ...otherProps,

    fullWidth: true,
    variant: "outlined",
  };

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
          multiline={multiline ? multiline : null}
          rows={rows ? rows : null}
          size='small'
          placeholder={placeholder}
          {...configTextField}
        />
      </Box>
    </>
  );
};

export default Textfield;
