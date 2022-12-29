import Slider from "infinite-react-carousel";
import { useSelector } from "react-redux";
import Image from "../Carousel/Components/Image";
import { useTheme, useMediaQuery, Box } from "@mui/material";

const InfiniteCarousel = () => {
  const images = useSelector((state) => state.books.carroussell || []);

  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  return (
    <Box display='flex' justifyContent='center'>
      <Box style={{ width: "80vw" }}>
        <Slider dots>
          {images.map((item, pos) => (
            <Image item={item} pos={pos} mobile={mobile} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default InfiniteCarousel;
