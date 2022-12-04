import { Box, Typography } from "@mui/material"
import { Colors } from "../../constants/pallette"
import { useNavigate } from "react-router"
import { ROUTE_PATHS } from "../../constants/routes"

const AdminSideBar = () => {
  const navigate = useNavigate()
  return (
    <Box display="flex" flexDirection="column" rowGap={2} style={{ position: "fixed", height: "100vh", backgroundColor: Colors.tealc, padding: "10px" }}>
      <Box style={{ border: "solid 2px whitesmoke", padding: "10px", borderRadius: "4px" }}>
        <Typography style={{ color: "white", cursor: "pointer" }}>
          Submit Book
        </Typography>
      </Box>
      <Box style={{ border: "solid 2px whitesmoke", padding: "10px", borderRadius: "4px" }}>
        <Typography onClick={() => navigate(ROUTE_PATHS.HOME)} style={{ color: "white", cursor: "pointer" }}>
          Back
        </Typography>
      </Box>

    </Box>
  )
}

export default AdminSideBar