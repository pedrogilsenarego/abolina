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
  const [field, meta] = useField(name ?? "");
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

  if (otherProps.getvalue) {
    otherProps.getvalue(meta.value);
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          {meta.touched && meta.error && (
            <Typography color='error'>{meta.error}</Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default Textfield;
