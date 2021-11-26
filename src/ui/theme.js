import { createTheme } from "@material-ui/core/styles";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#5167d0",
    },
    secondary: {
      main: "#fafafa",
    },
  },
});

export { darkTheme };
