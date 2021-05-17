const styles = theme => ({
    main: {
        width: "auto",
        display: "block",
        marginRight: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        },
    },

    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },

    form: {
        width: "100%",
        marginTop: theme.spacing.unit
    },

    submit: {
        marginTop: theme.spacing.unit * 3
    },

    hasAccountHeader: {
        width: "100%"
    },

    errorText:  {
        color: "#ff0000",
        textAlgin: "center"
    },

    logInLink: {
        width: "100%",
        textDecoration: "none",
        color: "#303f9f",
        fontWeight: "bolder"
    }
});

export default styles;