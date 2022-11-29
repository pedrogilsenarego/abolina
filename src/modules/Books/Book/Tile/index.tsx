import { Box, Typography } from "@mui/material"
import * as GStyled from "../../../../styles";

interface Props {
  title: string;
  name: string;
  text: string
}

const Tile = ({ title, name, text }: Props) => {
  return (
    <>
      <Box display='flex' justifyContent='start'>
        <GStyled.Title fontSize='16px' style={{ fontWeight: 700 }}>
          {title}
        </GStyled.Title>
      </Box>
      <Box display='flex' justifyContent='start' style={{ marginTop: "10px" }}>
        <GStyled.SubTitle fontSize='16px' style={{ fontWeight: 700 }}>
          {name}
        </GStyled.SubTitle>
      </Box>
      <Typography
        align='justify'
        style={{ marginTop: "10px", whiteSpace: "pre-line" }}
      >
        {text}
      </Typography>
    </>
  )
}

export default Tile