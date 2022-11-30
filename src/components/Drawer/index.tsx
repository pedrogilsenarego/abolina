import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Colors } from "../../constants/pallette";


type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
  position: Anchor;
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
  children: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
  clearBackground?: boolean;
  topRadius?: boolean;
};

const DrawerMine = ({
  position,
  openDrawer,
  setOpenDrawer,
  noPadding,
  fullWidth,
  fullHeight,
  children,
  clearBackground,
  topRadius,
}: Props) => {

  const list = () => (
    <Box
      component='div'
      sx={{
        width: fullWidth ? "100vw" : "auto",
        height: fullHeight ? "100vh" : "auto",
        backgroundColor: Colors.tealc,
        padding: noPadding ? "0px" : "10px",
        overflowY: "auto",
        borderRadius: topRadius ? "20px 20px 0 0" : "0 0 0 0",
      }}

      role='presentation'
    >
      {children}
    </Box>
  );

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <Drawer
        BackdropProps={{
          style: {

            backgroundColor: clearBackground ? "transparent" : "#00000066",
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent"
          }
        }}
        anchor={position}
        open={openDrawer}
        onClose={handleClose}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerMine;
