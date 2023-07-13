import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import homeOndas1 from "../../assets/images/homeOndas1.svg";
import homeOndas2 from "../../assets/images/homeOndas2.svg";
import Button from "../../components/Button";
import { Colors } from "../../constants/pallette";
import { ROUTE_PATHS } from "../../constants/routes";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import AbsoluteCarousel from "./Components/AbsoluteCarousel";
import Carousel from "./Components/Carousel";
import Carrousell from "./Components/Carrousell/Carrousell";
import Contacts from "./Components/Contacts";

const Home = () => {
  const navigate = useNavigate();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("md"));
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );

  return (
    <>
      <Box style={{ position: "relative" }}>
        {/*  <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {mobile ? <Carrousell /> : <Carousel />}
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AbsoluteCarousel />
        </motion.div>
        <Box
          style={{
            position: "absolute",
            zIndex: -10,
            width: "100%",
            bottom: mobile ? "-20%" : "-40%",
            backgroundImage: `url(${homeOndas1})`,
            backgroundSize: mobile ? "400%" : "100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minHeight: mobile ? "45%" : "40%",
          }}
        />
      </Box>
      <Box>
        <Container maxWidth="lg" style={{ justifyContent: "center" }}>
          <Box
            sx={{
              mt: mobile ? "0px" : "140px",
              paddingLeft: vertical ? "8px" : "0px",
              paddingRight: vertical ? "8px" : "0px",
            }}
          >
            <Typography fontWeight={800} fontSize={28} color={Colors.tealc}>
              {i18n.t("menuBar.about")}
            </Typography>
            <Typography
              align="justify"
              style={{ marginTop: "30px", whiteSpace: "pre-line" }}
            >
              {i18n.t("modules.about.mainText")}
            </Typography>
          </Box>
          <Box sx={{ mt: "20px" }} display="flex" justifyContent="start">
            <Button
              label={i18n.t("modules.home.mainTextBtn")}
              onClick={() => navigate(ROUTE_PATHS.ABOUT)}
            />
          </Box>
          <Box sx={{ mt: "120px" }}>
            <Contacts />
          </Box>
        </Container>
        <Box
          style={{
            marginTop: mobile ? "-120px" : "-200px",
            width: "100%",
            zIndex: -10,
            backgroundImage: `url(${homeOndas2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: mobile ? "33% center" : "0% 0%",
            minHeight: "30vh",
          }}
        />
      </Box>
    </>
  );
};

export default Home;
