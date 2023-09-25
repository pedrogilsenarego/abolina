import {
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Colors } from "../../../constants/pallette";
import { State } from "../../../slicer/types";
import { i18n } from "../../../translations/i18n";

const TopBar = () => {
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Grid
        container
        justifyContent={mobile ? "center" : "flex-end"}
        columnGap={1}
        style={{ padding: vertical ? "5px 0px 5px 0px" : "6px 0px 6px 0px" }}
      >
        <Grid item>
          <Typography fontSize={mobile ? "12px" : "16px"} color={Colors.tealc}>
            {i18n.t("topBar.memory")}
          </Typography>
        </Grid>
        <Divider
          orientation="vertical"
          style={{
            backgroundColor: "#00000003",
            height: mobile ? "17px" : "25px",
            width: "1px",
          }}
        />
        <Grid item>
          <Typography fontSize={mobile ? "12px" : "16px"} color={Colors.tealc}>
            {i18n.t("topBar.hope")}
          </Typography>
        </Grid>
        <Divider
          orientation="vertical"
          style={{
            backgroundColor: "#00000003",
            height: mobile ? "17px" : "25px",
            width: "1px",
          }}
        />
        <Grid item>
          <Typography fontSize={mobile ? "12px" : "16px"} color={Colors.tealc}>
            {i18n.t("topBar.audacity")}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TopBar;
