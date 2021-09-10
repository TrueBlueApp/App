import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Sound from 'react-sound';

class ChatListComponent extends React.Component {

    newChat = () => {
        this.props.newChatButtonClicked();
    };

    selectChat = (index) => {
        this.props.selectChat(index);
    };

    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

    render() {
        const {classes} = this.props;

        if (this.props.chats.length > 0) {
            return (
                <main className={classes.root}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        className={classes.newChatBtn}
                        onClick={this.newChat}
                    >Neue Nachricht</Button>
                    <List>
                        {this.props.chats.map((_chat, _index) => {
                            return (
                                <div key={_index}>
                                    <ListItem
                                        onClick={() => this.selectChat(_index)}
                                        className={classes.listItem}
                                        selected={this.props.selectedChatIndex === _index}
                                        alignItems="flex-start"
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" className={classes.avatar}>
                                                {
                                                    _chat.users.filter((_user) => _user !== this.props.userEmail)[0].split("")[0].toUpperCase()
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                _chat.users.filter(
                                                    (_user) => _user !== this.props.userEmail
                                                )[0]
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" color="textPrimary">
                                                        {_chat.messages[
                                                        _chat.messages.length - 1
                                                            ].message.substring(0, 30) + " ..."}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        {
                                            _chat.receiverRead === false && !this.userIsSender(_chat) ?
                                                <ListItemIcon>
                                                    <NotificationImportant className={classes.unreadMessage}/>
                                                    <Sound url="scratch-389.mp3" playStatus={Sound.status.PLAYING}/>
                                                </ListItemIcon> : null
                                        }
                                    </ListItem>
                                    <Divider/>
                                </div>
                            );
                        })}
                    </List>
                </main>
            );
        } else {
            return (
                <main className={classes.root}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={this.newChat}
                        className={classes.newChatBtn}
                        color='primary'
                    >
                        Neue Nachricht
                    </Button>
                    <List/>
                </main>
            );
        }
    }
}

export default withStyles(styles)(ChatListComponent);
