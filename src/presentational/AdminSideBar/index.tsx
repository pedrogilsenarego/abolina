import { Box, Divider, Typography } from "@mui/material";
import { Colors } from "../../constants/pallette";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { i18n } from "../../translations/i18n";
import { SiBookstack } from "react-icons/si"
import { AiTwotoneCreditCard, AiTwotoneHome } from "react-icons/ai"

const AdminSideBar = () => {
  const navigate = useNavigate();
  return (
    <Box
      display='flex'
      flexDirection='column'

      rowGap={2}
      style={{
        width: "200px",
        position: "fixed",
        height: "100vh",
        backgroundColor: Colors.tealc,
        padding: "10px",


      }}
    >
      <Box
        display="flex"
        columnGap={1}
        alignItems="center"
        onClick={() => navigate(ROUTE_PATHS.ADMIN)}
        style={{ marginTop: "10px" }}
      >
        <SiBookstack size="1.5em" color="white" />
        <Typography style={{ fontSize: "14px", color: "white", cursor: "pointer" }}>
          {i18n.t("adminSideBar.submitBook")}
        </Typography>
      </Box>
      <Box
        display="flex"
        columnGap={1}
        alignItems="center"
        onClick={() => navigate(ROUTE_PATHS.ADMIN_CARROUSEL)}

      >
        <AiTwotoneCreditCard size="1.5em" color="white" />
        <Typography style={{ fontSize: "14px", color: "white", cursor: "pointer" }}>
          {i18n.t("adminSideBar.manageCarroussel")}
        </Typography>
      </Box>
      <Divider />
      <Box
        display="flex"
        columnGap={1}
        alignItems="center"
        onClick={() => navigate(ROUTE_PATHS.HOME)}

      >
        <AiTwotoneHome size="1.5em" color="white" />
        <Typography style={{ fontSize: "14px", color: "white", cursor: "pointer" }}>
          {i18n.t("adminSideBar.back")}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminSideBar;
