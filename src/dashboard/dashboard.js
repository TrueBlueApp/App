import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";

import ChatListComponent from "../chatlist/chatList";
import ChatViewComponent from "../chatview/chatView";
import ChatTextBoxComponent from "../chattextbox/chatTextBox";
import NewChatComponent from "../newchat/newChat";
import SettingsCompoennt from "../settings/settings";
import { darkTheme } from "../ui/theme";
import { ThemeProvider } from "@material-ui/styles";

import { app } from "../firebase-config";
import firebase from "firebase/compat";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { Navigate } from "react-router";

const auth = getAuth();
const db = getFirestore();

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      settingsVisible: false,
      email: null,
      chats: [],
      redirect: null,
    };
  }

  componentDidMount = () => {
    onAuthStateChanged(auth, async (_user) => {
      if (!_user) {
        this.setState({ redirect: "/" });
      } else {
        const q = query(
          collection(db, "chats"),
          where("users", "array-contains", _user.email)
        );
        await onSnapshot(q, async (result) => {
          const chats = result.docs.map((_doc) => _doc.data());
          //Sort chats by last message date
          chats.sort((a, b) => {
            const timestampA = a.messages[a.messages.length - 1].timestamp;
            const timestampB = b.messages[b.messages.length - 1].timestamp;
            if (timestampA < timestampB) {
              return 1;
            } else if (timestampA > timestampB) {
              return -1;
            } else {
              return 0;
            }
          });
          await this.setState({ email: _user.email, chats: chats });
        });
      }
    });
  };

  clickedChatNotSender = (chatIndex) =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (_user) => _user !== this.state.email
      )[0]
    );

    updateDoc(doc(db, "chats", docKey), {
      receiverRead: true,
    });
  };

  selectChat = async (chatIndex) => {
    await this.setState({
      selectedChat: chatIndex,
      newChatFormVisible: false,
      settingsVisible: false,
    });
    this.messageRead();
  };

  newChatButtonClicked = () => {
    this.setState({
      newChatFormVisible: true,
      selectedChat: null,
      settingsVisible: false,
    });
  };

  settingsButtonClicked = () => {
    this.setState({
      settingsVisible: true,
      newChatFormVisible: false,
      selectedChat: null,
    });
  };

  signOut = () => {
    signOut(auth);
    this.setState({ redirect: "/" });
  };

  buildDocKey = (partner) => [this.state.email, partner].sort().join(":");

  submitMessage = (message) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (_user) => _user !== this.state.email
      )[0]
    );
    updateDoc(doc(db, "chats", docKey), {
      messages: firebase.firestore.FieldValue.arrayUnion({
        sender: this.state.email,
        message: message,
        timestamp: Date.now(),
      }),
      receiverRead: false,
    });
    this.setState({ selectedChat: 0 });
  };

  goToChat = async (docKey, message) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find((_chat) =>
      usersInChat.every((_user) => _chat.users.includes(_user))
    );
    this.setState({ newChatFormVisible: false, settingsVisible: false });
    this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(message);
  };

  newChatSubmit = async (chat) => {
    const docKey = this.buildDocKey(chat.sendTo);
    const docRef = doc(db, "chats", docKey);

    const newChat = {
      users: [this.state.email, chat.sendTo],
      messages: [
        {
          sender: this.state.email,
          message: chat.message,
          timestamp: Date.now(),
        },
      ],
      receiverRead: false,
    };
    await setDoc(docRef, newChat);

    this.setState({ newChatFormVisible: false });
    this.setState({ selectedChat: 0 });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    const { classes } = this.props;
    document.title = "TrueBlue | Dashboard";
    return (
      <ThemeProvider theme={darkTheme}>
        <ChatListComponent
          history={this.props.history}
          newChatButtonClicked={this.newChatButtonClicked}
          selectChat={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        />
        {this.state.newChatFormVisible ? null : (
          <ChatViewComponent
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
          />
        )}
        {this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
          <ChatTextBoxComponent
            submitMessage={this.submitMessage}
            messageRead={this.messageRead}
          />
        ) : null}
        {this.state.newChatFormVisible ? (
          <NewChatComponent
            goToChat={this.goToChat}
            newChatSubmit={this.newChatSubmit}
          />
        ) : null}
        {this.state.settingsVisible ? <SettingsCompoennt /> : null};
        <Button
          className={classes.settingsBtn}
          onClick={this.settingsButtonClicked}
        >
          Einstellungen
        </Button>
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          Abmelden
        </Button>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
