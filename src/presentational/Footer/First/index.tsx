import { Box } from "@mui/material";
import { ArrowDropUp } from "@mui/icons-material";


const First = () => {

  const moveTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <Box
      justifyContent="center"
      display="flex"
      alignItems="center"
      style={{
        border: "solid 2px",
        borderRadius: "4px",
        width: "30px",
        height: "30px",
        cursor: "pointer"
      }}
    >
      <ArrowDropUp onClick={() => moveTop()} />
    </Box>
  );
};

export default First;
