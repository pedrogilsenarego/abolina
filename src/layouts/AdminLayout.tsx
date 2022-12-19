import { Grid } from "@mui/material";
import AdminSideBar from "../presentational/AdminSideBar";


const AdminLayout = (props: any) => {
  return (
    <Grid container>
      <Grid  >
        <AdminSideBar />
      </Grid>


      <Grid style={{ padding: "20px", marginLeft: "200px", width: "100%", }}>



        {props.children}
      </Grid>


    </Grid>

  );
};

export default AdminLayout;
