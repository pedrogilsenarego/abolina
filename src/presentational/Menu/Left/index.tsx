import { CardMedia } from "@mui/material"
import logo from "../../../assets/images/logo.jpg"

const Left = () => {
  return (
    <CardMedia component="img"
      height="35"
      image={logo}
      alt="logo"></CardMedia>
  )
}

export default Left