import { Grid } from "@mui/material";
import { Colors } from "../constants/pallette";
import AdminSideBar from "../presentational/AdminSideBar";


const AdminLayout = (props: any) => {
  return (
    <Grid container>
      <AdminSideBar />
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        style={{ minHeight: "100vh", backgroundColor: Colors.dirtyWhite }}
      >
        <Grid item xs={12}>


        </Grid>
        <Grid
          item
          xs={12}
          style={{
            minHeight: "60vh",
            textAlign: "center",
            marginTop: "10vh",
            marginBottom: "15vh",

          }}
        >
          {props.children}
        </Grid>

        <Grid item xs={12}>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
