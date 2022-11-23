import Footer from "../presentational/Footer";
import TopBar from "../presentational/TopBar";
import { Grid } from "@mui/material";

const AdminLayout = (props: any) => {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>


        </Grid>
        <Grid
          item
          xs={12}
          style={{
            minHeight: "60vh",
            textAlign: "center",
            marginTop: "6vh",
            marginBottom: "15vh",
          }}
        >
          {props.children}
        </Grid>

        <Grid item xs={12}>

        </Grid>
      </Grid>
    </>
  );
};

export default AdminLayout;
