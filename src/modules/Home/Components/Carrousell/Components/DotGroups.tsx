import { Box } from "@mui/material";
import { Colors } from "../../../../../constants/pallette";

interface Props {
  numberDots: number;
  index: number;
  setIndex: (index: number) => void
}

const DotGroups = ({ numberDots, index, setIndex }: Props) => {
  const emptyArray = []

  for (let i = 0; i < numberDots; i++) {
    emptyArray.push({})
  }



  return (
    <>

      <Box display="flex" columnGap="5px" alignItems="center">
        {emptyArray.map((item, pos) => {
          return (
            <Box
              onClick={() => setIndex(pos)}
              key={pos}
              style={{
                cursor: "pointer",
                height: pos === index ? "10px" : "7px",
                width: pos === index ? "10px" : "7px",
                backgroundColor: pos === index ? Colors.tealc : Colors.tealcTransparent,
                borderRadius: "50%",

              }}
            />
          );
        })}
      </Box>
    </>
  );
};

export default DotGroups;
