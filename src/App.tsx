import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop";
import {
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider, createTheme
} from "@mui/material";
import Snackbar from "./components/SnackBar";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Calibri',
      textTransform: 'none',
      fontSize: 16,
      caretColor: "transparent"
    },
  },
});


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Snackbar />
          <CssBaseline />
          <ScrollToTop />
          <AppRoutes />
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
