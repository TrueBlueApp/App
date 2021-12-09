import React from "react";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../ui/theme";
import { Navigate } from "react-router";

const auth = getAuth();
const db = getFirestore();

class ResetpasswordComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      resetError: "",
      redirect: null,
    };
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  navigateToDashboard = () => {
    this.setState({ redirect: "/dashboard" });
  };

  submit = (e) => {
    e.preventDefault();

    //Firebase Auth reset password
    sendPasswordResetEmail(auth, this.state.email)
      .then(() => {
        this.setState({ resetError: "" });
        this.navigateToDashboard();
      })
      .catch((error) => {
        this.setState({ resetError: error.message });
      });
  };

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    const { classes } = this.props;
    document.title = "TrueBlue | Passwort zurücksetzen";
    return (
      <ThemeProvider theme={darkTheme}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <img src="/logo.png" alt="TrueBlue" width="20%" />
            <Typography component="h1" variant="h5">
              Passwort zurücksetzen
            </Typography>
            <form className={classes.form} onSubmit={(e) => this.submit(e)}>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signup-email-input">
                  Deine E-Mail Adresse
                </InputLabel>
                <Input
                  autoComplete="email"
                  autoFocus
                  id="signup-email-input"
                  onChange={(e) => this.userTyping("email", e)}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                E-Mail senden
              </Button>
            </form>
            {this.state.resetError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.resetError}
              </Typography>
            ) : null}
            <h4 className={classes.hasAccountHeader}>
              Passwort doch nicht vergessen?
            </h4>
            <a className={classes.logInLink} href="/">
              Logge dich ein!
            </a>
          </Paper>
        </main>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(ResetpasswordComponent);
