import { Box } from "@mui/material";
import { ArrowDropUp } from "@mui/icons-material";
import { useState } from "react";


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
        border: "solid 2px",
        borderRadius: "4px",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        backgroundColor: hover ? "#0000001A" : "transparent"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ArrowDropUp onClick={() => moveTop()} />
    </Box>
  );
};

export default UpScroller;
