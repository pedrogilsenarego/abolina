import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useField } from "formik";

interface Props {
  label?: string;
  color?: string;
  name: string;
  children?: React.ReactNode;
}
const CheckBox = ({ label, color, name, children }: Props) => {
  const [field, meta, helpers] = useField(name ?? "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.checked);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        <Checkbox
          checked={field.value}
          onChange={handleChange}
          sx={{
            color: color || "auto",
            "&.Mui-checked": {
              color: color || "auto",
            },
          }}
        />
        <div
          style={{ cursor: "pointer", display: "flex", columnGap: "4px" }}
          onClick={() => helpers.setValue(!field.value)}
        >
          {children}
        </div>
        <Typography
          style={{ cursor: "pointer" }}
          onClick={() => helpers.setValue(!field.value)}
        >
          {label}
        </Typography>
      </div>
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
    </div>
  );
};

export default CheckBox;
