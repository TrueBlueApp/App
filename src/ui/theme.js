import { createMuiTheme } from "@material-ui/core/styles"

const baseTheme = createMuiTheme({
    typography: {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: 14,
        fontFamilySecondary: "'Roboto Condensed', sans-serif",
    }
});

const darkTheme = createMuiTheme({
    ...baseTheme,
    palette: {
        type: "dark",
        primary: {
            main: "#5167d0"
        },
        secondary: {
            main: "#fafafa"
        },
    }
});

export { darkTheme }