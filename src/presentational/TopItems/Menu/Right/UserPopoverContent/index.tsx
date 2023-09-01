import { Box, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Colors } from "../../../../../constants/pallette";
import { ROUTE_PATHS } from "../../../../../constants/routes";
import { State } from "../../../../../slicer/types";
import { signOutUserStart } from "../../../../../slicer/user/user.actions";
import { CurrentUser } from "../../../../../slicer/user/user.types";
import { i18n } from "../../../../../translations/i18n";

const UserPopoverContent = ({ handleClose }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );

  return (
    <div
      onMouseLeave={handleClose}
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        rowGap: "6px",
        minWidth: "200px",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Typography
        style={{
          cursor: "pointer",
          fontWeight: 800,
          textTransform: "uppercase",
        }}
      >
        {currentUser.displayName}
      </Typography>
      <Divider style={{ width: "100%" }} />
      <Box>
        <Typography
          onClick={() => navigate(ROUTE_PATHS.CLIENT_MANAGEMENT)}
          style={{
            cursor: "pointer",
            color: Colors.tealc,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          {i18n.t("menuBar.userPopover.user")}
        </Typography>
        <Box style={{ marginLeft: "14px" }}>
          <Typography
            onClick={() => navigate(ROUTE_PATHS.CLIENT_MANAGEMENT)}
            style={{
              cursor: "pointer",
              color: Colors.tealc,
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {i18n.t("modules.clientManagement.generalSettings")}
          </Typography>
          <Typography
            onClick={() =>
              navigate(ROUTE_PATHS.CLIENT_MANAGEMENT, {
                state: "invoiceData",
              })
            }
            style={{
              cursor: "pointer",
              color: Colors.tealc,
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {i18n.t("modules.clientManagement.invoiceSettings")}
          </Typography>
          <Typography
            onClick={() =>
              navigate(ROUTE_PATHS.CLIENT_MANAGEMENT, {
                state: "couponsAvailable",
              })
            }
            style={{
              cursor: "pointer",
              color: Colors.tealc,
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {i18n.t("modules.clientManagement.couponsSettings")}
          </Typography>
        </Box>
      </Box>
      <Divider style={{ width: "100%" }} />
      <Typography
        style={{
          cursor: "pointer",
          color: Colors.tealc,
          fontWeight: 800,
          textTransform: "uppercase",
        }}
        onClick={() => dispatch(signOutUserStart())}
      >
        {i18n.t("menuBar.userPopover.logout")}
      </Typography>
      {currentUser?.userRoles?.includes("admin") && (
        <>
          <Divider style={{ width: "100%" }} />
          <Typography
            style={{
              cursor: "pointer",
              color: Colors.tealc,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
            onClick={() => navigate(ROUTE_PATHS.ADMIN)}
          >
            Admin
          </Typography>
        </>
      )}
    </div>
  );
};

export default UserPopoverContent;
