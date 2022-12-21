import { CardMedia } from "@mui/material";
import logo from "../../../assets/images/logoSite.svg";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/routes";

interface Props {
  height?: string;
}

const Left = ({ height }: Props) => {
  const navigate = useNavigate();
  return (
    <CardMedia
      component='img'
      height={height || "55"}
      onClick={() => navigate(ROUTE_PATHS.HOME)}
      image={logo}
      style={{ cursor: "pointer" }}
      alt='logo'
    ></CardMedia>
  );
};

export default Left;
