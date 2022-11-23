import { Box } from "@mui/material";
import { ArrowDropUp } from "@mui/icons-material";

const First = () => {
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
      <ArrowDropUp />
    </Box>
  );
};

export default First;
