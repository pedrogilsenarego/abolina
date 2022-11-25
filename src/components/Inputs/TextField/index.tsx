import * as Styled from "./styles";
import { useField } from "formik";
import { Typography, Box } from "@mui/material";

interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  form?: boolean;
  label?: string;
  multiline?: boolean
  rows?: number
}

const Textfield = ({ placeholder, onChange, name, form, label, multiline, rows }: Props) => {
  const [field, meta] = useField(name ?? "");

  const configTextField = form
    ? {
      ...field,
      error: false,
      helperText: "",
    }
    : {
      error: false,
      helperText: null,
      onChange: (e: any) => onChange && onChange(e.target.value),
    };

  if (form && meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <>
      <Box display="flex" justifyContent="start">
        <Typography>{label}</Typography>
      </Box>
      <Styled.TextField
        multiline={multiline}
        rows={rows || 0}
        size='small'
        placeholder={placeholder}
        {...configTextField}
      />
    </>
  );
};

export default Textfield;
