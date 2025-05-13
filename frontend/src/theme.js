import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";

const theme = createTheme({
  palette: {
    primary: {
      //botones
      main: "#4E7CD9", // azul
      light: "#EBF0FD", // hover
    },
    custom: {
      grey: "#FAFAFA", // hover
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
