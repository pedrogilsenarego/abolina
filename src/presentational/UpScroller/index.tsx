import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../constants/pallette";
import { BsCaretUpFill } from "react-icons/bs"


const UpScroller = () => {
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  const [hover, setHover] = useState<boolean>(false)

  if (!mobile) return (
    <Box
      position="fixed"
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{
        marginLeft: "1%",
        marginTop: "93vh",
        border: `solid 2px ${Colors.tealc}`,
        borderRadius: "4px",
        width: "35px",
        zIndex: 2000,
        height: "35px",
        cursor: "pointer",
        backgroundColor: !hover ? "#ffffff" : Colors.tealc
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { moveTop(); setHover(false) }}
    >
      <BsCaretUpFill color={hover ? "white" : Colors.tealc} size="0.8em" />
    </Box>
  );
  else return (<></>)
};

export default UpScroller;
