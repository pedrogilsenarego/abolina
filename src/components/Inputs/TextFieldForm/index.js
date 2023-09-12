import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";
import * as Styled from "./styles";

const Textfield = ({
  maxWidth = "auto",
  placeholder = "",
  name,
  label,
  disabled = false,
  fullWidth = false,
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

    variant: "outlined",
  };

  if (otherProps.getvalue) {
    otherProps.getvalue(meta.value);
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="start"
        width={fullWidth ? "100%" : "inherit"}
      >
        <Typography style={{ marginLeft: "6px", fontWeight: "bold" }}>
          {label}
        </Typography>

        <Styled.TextField
          disabled={disabled}
          type={showPassword || !password ? "text" : "password"}
          maxWidth
          multiline={multiline ? multiline : null}
          rows={rows ? rows : null}
          size="small"
          placeholder={placeholder}
          {...configTextField}
          InputProps={
            password
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
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
            <Typography color="error">{meta.error}</Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default Textfield;
