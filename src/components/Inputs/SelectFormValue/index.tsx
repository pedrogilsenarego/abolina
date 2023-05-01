import { MenuItem, Box, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import * as Styled from "./styles";

interface Props {
  options: Option[];
  label: string;
  name: string;
  getvalue?: (value: string) => void;
}
interface Option {
  value: string;
  title: string;
}
interface Config {
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  select: boolean;
}

const SelectWrapper = ({ name, options, label, getvalue, ...otherProps }: Props) => {
  const [field, meta, helper] = useField(name || "name");

  const configSelect: Config = {
    ...otherProps,
    fullWidth: true,
    select: true,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  if (getvalue) {
    getvalue(meta.value);
  }

  return (
    <>
      <Box display='flex' justifyContent='start'>
        <Typography>{label}</Typography>
      </Box>
      <Styled.TextField
        {...configSelect}
        variant='outlined'
        InputLabelProps={{ shrink: false }}

      >
        {options.map((item: Option, pos: number) => {
          return (
            <MenuItem
              key={pos}
              value={item.title || ""}
              onClick={(e: any) => helper.setValue(item.value)}
            >
              {item.title}
            </MenuItem>
          );
        })}
      </Styled.TextField>
    </>
  );
};

export default SelectWrapper;
