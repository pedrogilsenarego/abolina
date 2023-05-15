import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Colors } from "../../constants/pallette";
import { useState } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";

type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
  position: Anchor;
  openDrawer: boolean;
  setOpenDrawer?: (openDrawer: boolean) => void;
  children: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
  clearBackground?: boolean;
  topRadius?: boolean;
  width?: string;
  paddingLeft?: string;
  backgroundColor?: string
  borderRadius?: string
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
  width,
  paddingLeft,
  backgroundColor,
  borderRadius,
}: Props) => {
  const list = () => (
    <Box
      component='div'
      sx={{
        width: fullWidth ? "100vw" : width,
        height: fullHeight ? "100vh" : "auto",
        backgroundColor: backgroundColor || "White",
        padding: noPadding ? "0px" : "10px",
        paddingTop: "6vh",
        paddingLeft: paddingLeft || "auto",
        overflowY: "auto",
        borderRadius: borderRadius || "0 0px 0px 0",
        overflowX: "hidden",

      }}
      role='presentation'
    >
      {children}
    </Box>
  );

  const handleClose = () => {
    setOpenDrawer && setOpenDrawer(false);
  };

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      if (isLeftSwipe) {
        handleClose();
      }
  };

  return (
    <div>
      <Drawer
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        BackdropProps={{
          style: {
            backgroundColor: clearBackground ? "transparent" : "#00000066",
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
          },
          overflow: "hidden"
        }}
        anchor={position}
        open={openDrawer}
        onClose={setOpenDrawer && handleClose}
      >

        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerMine;
