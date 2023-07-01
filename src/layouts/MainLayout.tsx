import UpScroller from "../presentational/UpScroller";
import Footer from "../presentational/Footer";
import { Grid } from "@mui/material";
import TopItems from "../presentational/TopItems";
import { useSelector } from "react-redux";
import { State } from "../slicer/types";

const HomepageLayout = (props: any) => {
  const vertical = useSelector<State, boolean>((state) => state.general.positionVertical)
  return (
    <>
      {!props.noUpScroll && <UpScroller />}
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <TopItems />

        </Grid>
        <Grid
          item
          xs={12}
          style={{
            minHeight: "60vh",
            textAlign: "center",
            marginTop: vertical ? "17vh" : "150px",
            marginBottom: props.marginBottom || "15vh",
          }}
        >
          {props.children}
        </Grid>

        <Grid item xs={12} style={{ width: "100%" }}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default HomepageLayout;
