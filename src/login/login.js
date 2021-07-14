import React from "react";
import { Link } from "react";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: "",
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Logge dich ein!
          </Typography>
          <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signin-email-input">E-Mail</InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                id="signin-email-input"
                onChange={(e) => this.userTyping("email", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signin-password-input">Passwort</InputLabel>
              <Input
                autoComplete="password"
                onChange={(e) => this.userTyping("password", e)}
                id="signin-password-input"
              ></Input>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>Login</Button>
          </form>
          {
              this.state.signinError ?
              <Typography className={classes.errorText} component="h5" variant="h6">
                  {this.state.signinError}
              </Typography> : null
          }
          <a className={classes.signupLink} href="/signup">Noch kein Konto?</a>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginComponent);
