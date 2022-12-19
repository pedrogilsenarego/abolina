import { Box, Typography } from "@mui/material";
import { Colors } from "../../constants/pallette";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { i18n } from "../../translations/i18n";

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
        onClick={() => navigate(ROUTE_PATHS.ADMIN)}
        style={{ marginTop: "10px" }}
      >
        <Typography style={{ color: "white", cursor: "pointer" }}>
          {i18n.t("adminSideBar.submitBook")}
        </Typography>
      </Box>
      <Box
        onClick={() => navigate(ROUTE_PATHS.ADMIN_CARROUSEL)}

      >
        <Typography style={{ color: "white", cursor: "pointer" }}>
          {i18n.t("adminSideBar.manageCarroussel")}
        </Typography>
      </Box>
      <Box
        onClick={() => navigate(ROUTE_PATHS.HOME)}

      >
        <Typography style={{ color: "white", cursor: "pointer" }}>
          {i18n.t("adminSideBar.back")}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminSideBar;
