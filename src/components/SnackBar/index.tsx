import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../../slicer/general/general.actions";
import { BiErrorCircle } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
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
  icon: <BiErrorCircle />,
  color: "",
  bgcolor: "",
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
          color: "white",
          bgcolor: "orange",
        };
      case "fail":
        return {
          icon: <BiErrorCircle />,
          color: "white",
          bgcolor: "red",
        };
      case "success":
        return {
          icon: <GiCheckMark />,
          color: "white",
          bgcolor: "green",
        };
      default:
        return {
          icon: <GiCheckMark />,
          color: "white",
          bgcolor: "orange",
        };
    }
  };

  React.useEffect(() => {
    if (notificationType !== null) {
      const { color, icon, bgcolor } = getSnackbarElements(notificationType);
      setSnackbar({
        ...snackbar,
        open: true,
        color: color,
        bgcolor: bgcolor,
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
      >
        <Styled.Box bgcolor={snackbar.bgcolor}>
          {snackbar.icon} {snackbar.message}
        </Styled.Box>
      </Snackbar>
    </>
  );
};

export default DirectionSnackbar;
