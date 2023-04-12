import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../../constants/pallette";
import InstaAvatar from "../../../components/InstaAvatar";
import useChangeLang from "../../../hooks/usechangeLang";
import { LANG } from "../../../constants/lang";
import { State } from "../../../slicer/types";
import { CurrentUser } from "../../../slicer/user/user.types";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../../slicer/user/user.actions";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useNavigate } from "react-router";

const Right = () => {
  const { changeLanguage } = useChangeLang();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );

  const handleSignOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <Grid
      container
      alignItems='center'
      justifyContent={mobile ? "center" : "start"}
    >
      {!mobile && (
        <Grid item>
          <Box
            style={{
              borderRight: "solid 2px #ffffffB3",
              paddingRight: "10px",
            }}
          >
            <InstaAvatar
              size='1em'
              backgroundColor='white'
              color={Colors.tealc}
            />
          </Box>
        </Grid>
      )}
      <Grid item>
        <Box style={{ paddingLeft: "10px" }}>
          <Typography
            fontSize={mobile ? "24px" : "12px"}
            color='white'
            fontWeight={800}
            onClick={() => {
              changeLanguage(LANG.pt);
            }}
            style={{ cursor: "pointer" }}
          >
            PT
          </Typography>
          <Typography
            fontSize={mobile ? "24px" : "12px"}
            color='white'
            fontWeight={800}
            onClick={() => {
              changeLanguage(LANG.en);
            }}
            style={{ cursor: "pointer" }}
          >
            EN
          </Typography>
        </Box>
      </Grid>
      {currentUser ? (
        <Box display="flex" flexDirection="column" style={{ cursor: "pointer" }}>
          <Typography onClick={handleSignOut}>Logout</Typography>
          {currentUser.userRoles.includes("admin") && (
            <Typography onClick={() => navigate(ROUTE_PATHS.ADMIN)}>
              Admin
            </Typography>
          )}
        </Box>
      ) : (
        <Typography onClick={() => navigate(ROUTE_PATHS.LOGIN)}>
          Login
        </Typography>
      )}
    </Grid>
  );
};

export default Right;
