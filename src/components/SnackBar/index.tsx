import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/pallette";
import { clearNotification } from "../../slicer/general/general.actions";
import * as Styled from "./styles";

interface SnackbarState {
  open: boolean;
  message: string;
  type: null | "success" | "fail";
  color: string;
  bgcolor: string;
  icon: any;
}

const INITIALSTATE = {
  open: false,
  message: "",
  type: null,
  icon: null,
  color: "white",
  bgcolor: "white",
};

const DirectionSnackbar = () => {
  const mapState = (state: any) => ({
    general: state.general,
  });
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    ...INITIALSTATE,
  });

  const { general } = useSelector(mapState);
  const { notificationMessage, notificationType } = general;

  const getSnackbarElements = (type: string) => {
    switch (type) {
      case "information":
        return {
          icon: <BiErrorCircle />,
        };
      case "fail":
        return {
          icon: <BiErrorCircle color="red" size="1rem" />,
        };
      case "success":
        return {
          icon: <GiCheckMark color={Colors.tealc} size="1rem" />,
        };
      default:
        return {
          icon: <GiCheckMark color="green" size="1rem" />,
        };
    }
  };

  React.useEffect(() => {
    if (notificationType !== null) {
      const { icon } = getSnackbarElements(notificationType);
      setSnackbar({
        ...snackbar,
        open: true,
        icon: icon,
        message: notificationMessage,
        type: notificationType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [general]);

  const handleClose = () => {
    dispatch(clearNotification());
    setSnackbar({ ...INITIALSTATE });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        onClose={handleClose}
        autoHideDuration={4000}
        sx={{ marginTop: "140px", marginRight: "100px" }}
      >
        <Styled.Box
          bgcolor={snackbar.bgcolor}
          notificationType={notificationType}
        >
          {snackbar.icon}
          <Typography color={Colors.tealc}>{snackbar.message}</Typography>
        </Styled.Box>
      </Snackbar>
    </>
  );
};

export default DirectionSnackbar;
