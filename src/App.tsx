import Menu from "./presentational/Menu";
import TopBar from "./presentational/TopBar"
import Footer from "./presentational/Footer"
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Menu />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
