
import Checkbox from "@mui/material/Checkbox";

interface Props {
  label?: JSX.Element;
  color?: string;
  setValue?: (value: boolean) => void
  value?: boolean
}
const CheckBox = ({ label, color, setValue = () => { }, value = false }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  const handleLabelClick = () => {
    setValue(!value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "-10px"
        }}

      >
        <Checkbox
          checked={value}
          onChange={handleChange}
          sx={{
            color: color || "auto",
            "&.Mui-checked": {
              color: color || "auto",
            },
          }}
        />
        <div onClick={handleLabelClick} style={{ cursor: "pointer" }}>
          {label}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >

      </div>
    </div>
  );
};

export default CheckBox;
