import { CardMedia, useTheme, useMediaQuery, Box } from "@mui/material";
import logo from "../../../../assets/images/logoSite.svg";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../constants/routes";


interface Props {
  height?: string;
}

const Left = ({ height }: Props) => {
  const navigate = useNavigate();
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("md"))
  return (
    <Box style={{ height: mobile ? "44px" : "55px" }}>
      <CardMedia
        component='img'
        height="100%"
        sx={{ objectFit: "contain" }}
        onClick={() => navigate(ROUTE_PATHS.HOME)}
        image={logo}
        style={{ cursor: "pointer" }}
        alt='logo'
      ></CardMedia>
    </Box>
  );
};

export default Left;
