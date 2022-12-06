import * as Styled from "./styles";
import { useField } from "formik";
import { Typography, Box } from "@mui/material";

const Textfield = ({
  placeholder = "",
  name,
  label,
  multiline = false,
  rows = 0,
  ...otherProps
}) => {
  const [field, mata] = useField(name ?? "");

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
      <Box display='flex' justifyContent='start'>
        <Typography>{label}</Typography>
      </Box>
      <Styled.TextField
        multiline={multiline ? multiline : null}
        rows={rows ? rows : null}
        size='small'
        placeholder={placeholder}
        {...configTextField}
      />
    </>
  );
};

export default Textfield;
