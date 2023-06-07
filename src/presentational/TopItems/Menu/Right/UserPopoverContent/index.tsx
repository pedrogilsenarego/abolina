import { Divider, Typography } from "@mui/material";
import { i18n } from "../../../../../translations/i18n";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../../../../slicer/user/user.actions";
import { State } from "../../../../../slicer/types";
import { CurrentUser } from "../../../../../slicer/user/user.types";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../../../constants/routes";
import { Colors } from "../../../../../constants/pallette";

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
        rowGap: "10px",
        minWidth: "200px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        onClick={() => navigate(ROUTE_PATHS.CLIENT_MANAGEMENT)}
        style={{ cursor: "pointer", color: Colors.tealc, fontWeight: 800, textTransform: "uppercase" }}
      >
        {i18n.t("menuBar.userPopover.user")}
      </Typography>

      <Typography
        style={{ cursor: "pointer", color: Colors.tealc, fontWeight: 800, textTransform: "uppercase" }}
        onClick={() => dispatch(signOutUserStart())}
      >
        {i18n.t("menuBar.userPopover.logout")}
      </Typography>
      {currentUser?.userRoles?.includes("admin") && (
        <>
          <Divider style={{ width: "90%" }} />
          <Typography
            style={{ cursor: "pointer", color: Colors.tealc, fontWeight: 800, textTransform: "uppercase" }}
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
