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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../ui/theme";
import { Navigate } from "react-router";

const auth = getAuth();
const db = getFirestore();

class SignupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: "",
      redirect: null,
    };
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  navigateToDashboard = () => {
    this.setState({ redirect: "/dashboard" });
  };

  submitSignup = (e) => {
    e.preventDefault();

    if (!this.formIsValid()) {
      this.setState({ signupError: "Die Passwörter stimmen nicht überein!" });
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password
    ).then(
      (authResponse) => {
        const userObject = {
          email: authResponse.user.email,
        };
        setDoc(doc(db, "users", this.state.email), userObject).then(
          () => {
            this.navigateToDashboard();
          },
          (dbError) => {
            this.setState({ signupError: dbError.message });
          }
        );
      },
      (authError) => {
        this.setState({ signupError: authError.message });
      }
    );
  };

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "passwordConfirmation":
        this.setState({ passwordConfirmation: e.target.value });
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
    document.title = "TrueBlue | Kontoerstellung";
    return (
      <ThemeProvider theme={darkTheme}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Registriere Dich!
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => this.submitSignup(e)}
            >
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
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signup-password-input">
                  Wähle ein Passwort
                </InputLabel>
                <Input
                  type="password"
                  onChange={(e) => this.userTyping("password", e)}
                  id="signup-password-input"
                />
              </FormControl>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signup-password-confirmation-input">
                  Bestätige dein Passwort
                </InputLabel>
                <Input
                  type="password"
                  onChange={(e) => this.userTyping("passwordConfirmation", e)}
                  id="signup-password-confirmation-input"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Regisitrieren
              </Button>
            </form>
            {this.state.signupError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.signupError}
              </Typography>
            ) : null}
            <h4 className={classes.hasAccountHeader}>
              Hast du bereits ein Konto?
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

export default withStyles(styles)(SignupComponent);
