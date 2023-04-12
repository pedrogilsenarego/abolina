import * as Styled from "./styles";
import { useField } from "formik";
import { useState } from "react";
import { IconButton, InputAdornment, Typography, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Textfield = ({
  maxWidth = "auto",
  placeholder = "",
  name,
  label,
  password = false,
  multiline = false,
  rows = 0,
  ...otherProps
}) => {
  const [field, mata] = useField(name ?? "");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const configTextField = {
    ...field,
    ...otherProps,

    fullWidth: true,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  if (otherProps.getvalue) {
    otherProps.getvalue(mata.value);
  }

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='start'
        justifyContent='start'
      >
        <Typography>{label}</Typography>

        <Styled.TextField
          type={showPassword || !password ? "text" : "password"}
          maxWidth
          multiline={multiline ? multiline : null}
          rows={rows ? rows : null}
          size='small'
          placeholder={placeholder}
          {...configTextField}
          InputProps={
            password
              ? {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
      </Box>
    </>
  );
};

export default Textfield;
