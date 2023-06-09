import { Button } from "@mui/material";
import { Colors } from "../../../constants/pallette"
interface Props {
  title: string;
  onClick: any;
  disabled?: boolean;
}

const ButtonPopup = ({ title, onClick, disabled }: Props) => {
  return (
    <Button
      disabled={disabled ? true : false}
      style={{ color: disabled ? "lightGrey" : Colors.tealc, letterSpacing: "1px", fontSize: "13px", fontWeight: 700 }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default ButtonPopup;
