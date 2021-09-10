import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";
import TimeAgo from "react-timeago";
import germanStrings from 'react-timeago/lib/language-strings/de';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

class ChatViewComponent extends React.Component {

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');

        if(container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }

    keyGenerator = (index) => {
        return index + "_message";
    }

    render() {
        const { classes, user, chat } = this.props;

        if(chat === undefined) {
            return(<main className={classes.content} id='chatview-container'/>);
        } else {
            return(
                <div>
                    <div className={classes.chatHeader}>
                        Unterhaltung mit {chat.users.filter(_user => _user !== user )}
                    </div>
                    <main className={classes.content} id='chatview-container'>
                        {
                            chat.messages.map((_message, _index) => {
                                return(
                                    <div key={_index} className={_message.sender === user ? classes.userSent : classes.friendSent }>
                                        {_message.message}
                                        <Typography variant="subtitle2" style={{ color: "#C2C5BB" }}><TimeAgo date={_message.timestamp} formatter={buildFormatter(germanStrings)}/></Typography>
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            );
        }
    }
}

export default withStyles(styles)(ChatViewComponent);