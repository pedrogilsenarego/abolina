import Menu from "./presentational/Menu";
import TopBar from "./presentational/TopBar"
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Menu />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
