import { CardMedia } from "@mui/material"
import logo from "../../../assets/images/logo.jpg"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATHS } from "../../../constants/routes"

const Left = () => {
  const navigate = useNavigate()
  return (
    <CardMedia component="img"
      height="35"
      onClick={() => navigate(ROUTE_PATHS.ADMIN)}
      image={logo}
      alt="logo"></CardMedia>
  )
}

export default Left