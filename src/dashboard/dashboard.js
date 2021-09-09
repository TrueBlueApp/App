import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import firebase from 'firebase';

import ChatListComponent from '../chatlist/chatList';
import ChatViewComponent from '../chatview/chatView';
import ChatTextBoxComponent from '../chattextbox/chatTextBox';

class DashboardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _user => {
            if(!_user) {
                this.props.history.push('/login');
            } else {
                await firebase.firestore().collection('chats').where('users', 'array-contains', _user.email)
                .onSnapshot(async result => {
                    const chats = result.docs.map(_doc => _doc.data());
                    await this.setState({ email: _user.email, chats: chats });
                    console.log(this.state) //REMOVE ME LOL
                })
            }
        });
    }


    selectChat = (chatIndex) => {
        this.setState({ selectedChat: chatIndex })
    }

    newChatButtonClicked = () => {
         this.setState({ newChatFormVisible: true, selectedChat: null})
    }

    signOut = () => firebase.auth().signOut();

    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

    submitMessage = (message) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user => _user !== this.state.email)[0]);
        firebase.firestore().collection('chats').doc(docKey).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.state.email,
                message: message,
                timestamp: Date.now()
            }),
            receiverRead: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <ChatListComponent history={this.props.history} newChatButtonClicked={this.newChatButtonClicked} selectChat={this.selectChat} 
                chats={this.state.chats} userEmail={this.state.email} selectedChatIndex={this.state.selectedChat}/>
                {
                    this.state.newChatFormVisible ? null : 
                    <ChatViewComponent user={this.state.email} chat={this.state.chats[this.state.selectedChat]}></ChatViewComponent>
                }
                {
                    this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent submitMessage={this.submitMessage}></ChatTextBoxComponent> : null
                }
                <Button onClick={this.signOut} className={classes.signOutBtn}>Abmelden</Button>
            </div>
        );
    }

}

export default withStyles(styles)(DashboardComponent);