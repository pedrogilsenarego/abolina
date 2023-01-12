import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Box } from "@mui/material";
import * as GStyled from "../../../../../styles";
import { Colors } from "../../../../../constants/pallette";

interface Props {
  title: any;
  handleRight?: () => void;
  handleLeft?: () => void;
}

const CollectionBrowser = ({ title, handleRight, handleLeft }: Props) => {
  return (
    <Box display='flex' columnGap={1} alignItems='center' >
      <Box
        style={{
          backgroundColor: Colors.tealc,
          borderRadius: "3px",
          cursor: "pointer",
        }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <FiChevronLeft
          size='2em'
          color='white'
          onClick={() => (handleLeft ? handleLeft() : null)}
        />
      </Box>
      <GStyled.Title fontSize='16px' style={{ fontWeight: 700 }}>
        {title}
      </GStyled.Title>
      <Box
        style={{
          backgroundColor: Colors.tealc,
          borderRadius: "3px",
          cursor: "pointer",
        }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <FiChevronRight
          size='2em'
          color='white'
          onClick={() => (handleRight ? handleRight() : null)}
        />
      </Box>
    </Box>
  );
};

export default CollectionBrowser;
