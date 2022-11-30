import { Box } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../constants/pallette";
import { BsCaretUpFill } from "react-icons/bs"


const UpScroller = () => {

  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  const [hover, setHover] = useState<boolean>(false)

  return (
    <Box
      position="fixed"
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{
        marginLeft: "2%",
        marginTop: "90vh",
        border: `solid 2px ${Colors.tealc}`,
        borderRadius: "4px",
        width: "30px",
        zIndex: 2000,
        height: "30px",
        cursor: "pointer",
        backgroundColor: hover ? "#0000001A" : "transparent"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <BsCaretUpFill onClick={() => moveTop()} color={Colors.tealc} size="0.7em" />
    </Box>
  );
};

export default UpScroller;
