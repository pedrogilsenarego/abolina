import { MenuItem, Box, Typography } from "@mui/material";
import { useField, } from "formik";
import * as Styled from "./styles";
import { useState } from "react";
import Loader from "../../Loader";

interface Props {
  options: Option[];
  label: string;
  name: string;
  getvalue?: (value: string) => void;
  initialValue?: string
  loading?: boolean;
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
  onChange: any

}

const SelectWrapper = ({ name, options, label, loading, getvalue, initialValue, ...otherProps }: Props) => {
  const [field, meta, helper] = useField({
    name: name || "name",
    defaultValue: "",
  });
  const [selected, setSelected] = useState<any>(initialValue);

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setSelected(value);
    helper.setValue(value)

  };
  const configSelect: Config = {
    ...otherProps,
    fullWidth: true,
    select: true,
    onChange: handleChange
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
      {loading ? (
        <Loader />) :
        (<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box display='flex' justifyContent='start'>
            <Typography>{label}</Typography>
          </Box>
          <Styled.TextField
            {...configSelect}
            variant='outlined'
            InputLabelProps={{ shrink: false }}
            value={selected}


          >
            {Object.keys(options).map((item: any, pos) => {
              return (
                <MenuItem key={pos} value={options[item].value}>
                  {options[item].title}
                </MenuItem>
              );
            })}
          </Styled.TextField>
        </div>)}</>
  );
};

export default SelectWrapper;
