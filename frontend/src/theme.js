import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4E7CD9",
      light: "#EBF0FD",
    },
    custom: {
      grey: "#FAFAFA",
      icons: "#606368",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#606368",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
