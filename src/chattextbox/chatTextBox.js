import React from 'react';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatTextBoxComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      chatText: ''
    }
  }

  userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });
  
  messageValid = (text) => text && text.replace(/\s/g, '').length;

  userClickedInput = () => {
    console.log("clicked input")
  }

  submitMessage = () => {
    if(this.messageValid(this.state.chatText)) {
      this.props.submitMessage(this.state.chatText);
      document.getElementById('chattextbox').value = '';
    }
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.chatTextBoxContainer}>
        <TextField placeholder='Deine Nachricht...' onKeyUp={(e) => this.userTyping(e)}
        id='chattextbox' className={classes.chatTextBox} onFocus={this.userClickedInput}></TextField>
        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
      </div>
    );
  }

}

export default withStyles(styles)(ChatTextBoxComponent);