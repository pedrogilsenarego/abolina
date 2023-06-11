import Checkbox from "@mui/material/Checkbox";

interface Props {
  label?: JSX.Element;
  color?: string;
  setValue?: (value: boolean) => void;
  value?: boolean;
  disabled?: boolean
}
const CheckBox = ({
  label,
  color,
  setValue = () => { },
  value = false,
  disabled = false
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  const handleLabelClick = () => {
    if (!disabled) setValue(!value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "-10px",
        }}
      >
        <Checkbox
          disabled={disabled}
          checked={value}
          onChange={handleChange}
          sx={{
            color: disabled ? "lightGrey" : color || "auto",
            "&.Mui-checked": {
              color: disabled ? "lightGrey" : color || "auto",
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
      ></div>
    </div>
  );
};

export default CheckBox;
