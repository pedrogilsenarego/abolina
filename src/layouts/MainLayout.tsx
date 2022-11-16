import React from "react";
import Header from "../presentational/Menu";
import Footer from "../presentational/Footer";
import TopBar from "../presentational/TopBar";
import { Grid } from "@mui/material";



const HomepageLayout = (props: any) => {

  return (
    <>

      <Grid
        container
        direction='column'
        justifyContent='space-between'
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <TopBar />
          <Header />

        </Grid>
        {props.children}
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>

    </>
  );
};

export default HomepageLayout;
