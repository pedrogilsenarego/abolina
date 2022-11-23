
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />

    </BrowserRouter>
  );
}

export default App;
