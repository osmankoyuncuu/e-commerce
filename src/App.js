import AppRouter from "./router/AppRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { Provider } from "react-redux";
import store from "./app/store";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: deepOrange[500],
      },
      secondary: {
        main: grey[500],
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
