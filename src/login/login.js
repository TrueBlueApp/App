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
import { app } from "../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../ui/theme";
import { Navigate } from "react-router";

const auth = getAuth();

class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: "",
      redirect: null,
    };
  }

  componentDidMount() {
    const user = getAuth().currentUser;
    if (user) {
      this.navigateToDashboard();
    }
  }

  navigateToDashboard = () => {
    this.setState({ redirect: "/dashboard" });
  };

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  submitLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password
    ).then(
      () => {
        this.navigateToDashboard();
      },
      (error) => {
        this.setState({ loginError: error.message });
      }
    );
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    const { classes } = this.props;
    document.title = "TrueBlue | Login";
    return (
      <ThemeProvider theme={darkTheme}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <img src="/logo.png" alt="TrueBlue" width="20%" />
            <Typography component="h1" variant="h5">
              Logge dich ein!
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => this.submitLogin(e)}
            >
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signin-email-input">E-Mail</InputLabel>
                <Input
                  autoComplete="email"
                  autoFocus
                  id="signin-email-input"
                  onChange={(e) => this.userTyping("email", e)}
                  type="email"
                />
              </FormControl>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signin-password-input">
                  Passwort
                </InputLabel>
                <Input
                  autoComplete="password"
                  onChange={(e) => this.userTyping("password", e)}
                  id="signin-password-input"
                  type="password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
            {this.state.loginError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.loginError}
              </Typography>
            ) : null}
            <a className={classes.signupLink} href="/signup">
              Noch kein Konto?
            </a>
          </Paper>
        </main>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(LoginComponent);
