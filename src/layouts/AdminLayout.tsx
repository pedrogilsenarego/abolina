import { Grid } from "@mui/material";
import AdminSideBar from "../presentational/AdminSideBar";


const AdminLayout = (props: any) => {
  return (
    <Grid container>
      <Grid item xs={1.2} >
        <AdminSideBar />
      </Grid>


      <Grid item xs={10.8} style={{ padding: "20px" }}>



        {props.children}
      </Grid>


    </Grid>

  );
};

export default AdminLayout;
