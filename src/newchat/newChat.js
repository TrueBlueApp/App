import React from "react";
import styles from "./styles";
import {
  FormControl,
  Input,
  Button,
  Paper,
  InputLabel,
  withStyles,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import firebase from "firebase/compat/app";

class NewChatComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      message: null,
      serverError: false,
    };
  }

  userTyping = (input, e) => {
    switch (input) {
      case "username":
        this.setState({ username: e.target.value });
        break;
      case "message":
        this.setState({ message: e.target.value });
        break;
      default:
        break;
    }
  };

  createChat = () => {
    this.props.newChatSubmit({
      sendTo: this.state.username,
      message: this.state.message,
    });
  };

  goToChat = () => this.props.goToChat(this.buildDocKey(), this.state.message);

  submitNewChat = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if (userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  };

  userExists = async () => {
    const usersSnapshot = await firebase.firestore().collection("users").get();
    const exists = usersSnapshot.docs
      .map((_doc) => _doc.data().email)
      .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  };

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.username]
      .sort()
      .join(":");
  };

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sende eine Nachricht!
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => this.submitNewChat(e)}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-email">
                Gebe die E-Mail des Empfängers ein
              </InputLabel>
              <Input
                required
                className={classes.input}
                autoFocus
                onChange={(e) => this.userTyping("username", e)}
                id="new-chat-email"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-message">
                Gebe die Nachricht ein
              </InputLabel>
              <Input
                required
                className={classes.input}
                onChange={(e) => this.userTyping("message", e)}
                id="new-chat-message"
              />
            </FormControl>
            <Button
              fullWidth
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit"
            >
              Senden
            </Button>
          </form>
          {this.state.serverError ? (
            <Typography
              component="h5"
              variant="h6"
              className={classes.errorText}
            >
              Unable to locate the user
            </Typography>
          ) : null}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(NewChatComponent);
