import { useNavigate } from "react-router"
import { ROUTE_PATHS } from "../../constants/routes"

const Books = () => {
  const Navigate = useNavigate()
  return (
    <div onClick={() => Navigate(ROUTE_PATHS.BOOKS_BOOK)}>Books</div>
  )
}

export default Books