const styles = theme => ({
    main: {
        width: "auto",
        display: "block",
        marginRight: theme.spacing() * 3,
        marginLeft: theme.spacing() * 3,
        [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        },
    },

    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing() * 8,
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`
    },

    form: {
        width: "100%",
        marginTop: theme.spacing()
    },

    submit: {
        marginTop: theme.spacing() * 3
    },

    hasAccountHeader: {
        width: "100%"
    },

    errorText:  {
        color: "#ff0000",
        textAlgin: "center"
    },

    signupLink: {
        width: "100%",
        textDecoration: "none",
        color: "#66a0ff",
        fontWeight: "bolder",
        marginTop: "10px"
    }
});

export default styles;