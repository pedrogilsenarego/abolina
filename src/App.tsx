import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop";
import {
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import Snackbar from "./components/SnackBar";


function App() {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <Snackbar />
        <CssBaseline />
        <ScrollToTop />
        <AppRoutes />
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;
