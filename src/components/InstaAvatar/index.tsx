import { Avatar } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

interface Props {
  backgroundColor: string;
  color: string;
  size?: string
}

const InstaAvatar = ({ backgroundColor, color, size }: Props) => {
  return (
    <Avatar style={{ backgroundColor: backgroundColor }}>
      <InstagramIcon style={{ color: color || backgroundColor, fontSize: size || "auto" }} />
    </Avatar>
  );
};

export default InstaAvatar;
