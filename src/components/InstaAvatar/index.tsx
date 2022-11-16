import { Avatar } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';

interface Props {
  backgroundColor: string
  color: string
}

const InstaAvatar = ({ backgroundColor, color }: Props) => {
  return (
    <Avatar style={{ backgroundColor: backgroundColor }}><InstagramIcon style={{ color: color || backgroundColor }} /></Avatar>
  )
}

export default InstaAvatar