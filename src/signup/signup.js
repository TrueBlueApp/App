import React from 'react';
import { Link } from 'react';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

class SignupComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: ""
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registriere Dich!
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitSignup(e)}>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-email-input">Deine E-Mail Adresse</InputLabel>
                            <Input autoComplete="email" autoFocus id="signup-email-input" onChange={(e) => this.userTyping("email", e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-input">Wähle ein Passwort</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping("password", e)} id="signup-password-input"></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-confirmation-input">Bestätige dein Passwort</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping("passwordConfirmation", e)} id="signup-password-confirmation-input"></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Regisitrieren</Button>
                    </form>
                    {
                        this.state.signupError ?
                        <Typography className={classes.errorText} component="h5" variant="h6">
                             {this.state.signupError}
                        </Typography> : null
                    }
                    <h4 className={classes.hasAccountHeader}>Hast du bereits ein Konto?</h4>
                    <a className={classes.logInLink} href="/login">Logge dich ein!</a>
                </Paper>
            </main>
        );
    }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    submitSignup = (e) => {
        e.preventDefault();
        
        if(!this.formIsValid()) {
            this.setState({ signupError: "Die Passwörter stimmen nicht überein!" });
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            authResponse => {
                const userObject = {
                    email: authResponse.user.email
                };
                firebase.firestore().collection("users").doc(this.state.email).set(userObject).then(() => {
                    this.props.history.push("/dashboard");
                }, dbError => {
                    console.log(dbError);
                    this.setState({ signupError: "Nutzer konnt enicht erstellt werden"});
                });
            }, authError => {
                console.log(authError);
                this.setState({ signupError: "Nutzer konnt enicht erstellt werden"});
            }
        )
    }

    userTyping = (type, e) => {
        switch(type) {
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            case "passwordConfirmation":
                this.setState({ passwordConfirmation: e.target.value });
                break;
        }
    }

}

export default withStyles(styles)(SignupComponent);