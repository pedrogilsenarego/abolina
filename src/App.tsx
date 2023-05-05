import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop";
import {
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider, createTheme
} from "@mui/material";
import Snackbar from "./components/SnackBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./slicer/user/user.actions";
import { Colors } from "./constants/pallette";
import CookiePolicy from "./presentational/CookiePopup";
import { QueryClient, QueryClientProvider } from 'react-query';
import { disableLoading } from "./slicer/general/general.actions";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Calibri',
      textTransform: 'none',
      fontSize: 16,
      caretColor: Colors.tealc
    },
  },
});




function App() {
  const dispatch = useDispatch()
  useEffect(
    () => {
      dispatch(checkUserSession());
      dispatch(disableLoading())
    },
    // eslint-disable-next-line
    []
  );
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <CookiePolicy />
            <Snackbar />
            <CssBaseline />
            <ScrollToTop />
            <AppRoutes />
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
