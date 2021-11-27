import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";

import ChatListComponent from "../chatlist/chatList";
import ChatViewComponent from "../chatview/chatView";
import ChatTextBoxComponent from "../chattextbox/chatTextBox";
import NewChatComponent from "../newchat/newChat";
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
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const auth = getAuth();
const db = getFirestore();

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: [],
    };
  }

  componentDidMount = () => {
    onAuthStateChanged(auth, async (_user) => {
      if (!_user) {
        history.push("/");
      } else {
        const q = query(
          collection(db, "chats"),
          where("users", "array-contains", _user.email)
        );
        await onSnapshot(q, async (result) => {
          console.log(result);
          const chats = result.docs.map((_doc) => _doc.data());
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
    if (this.clickedChatNotSender(this.state.selectedChat)) {
      updateDoc(db, "chats", docKey, { receiverRead: true });
    }
  };

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  };

  newChatButtonClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  signOut = () => signOut(auth);

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
  };

  goToChat = async (docKey, message) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find((_chat) =>
      usersInChat.every((_user) => _chat.users.includes(_user))
    );
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(message);
  };

  newChatSubmit = async (chat) => {
    const docKey = this.buildDocKey(chat.sendTo);
    /*await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverRead: false,
        users: [this.state.email, chat.sendTo],
        messages: [
          {
            message: chat.message,
            sender: this.state.email,
            timestamp: Date.now(),
          },
        ],
      });*/
    const docRef = doc(db, "chats", docKey);
    await setDoc(docRef, {
      receiverRead: false,
      users: [this.state.email, chat.sendTo],
      messages: [
        {
          message: chat.message,
          sender: this.state.email,
          timestamp: Date.now(),
        },
      ],
    });
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.length - 1);
  };

  render() {
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
        <Button className={classes.settingsBtn}>Einstellungen</Button>
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          Abmelden
        </Button>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
