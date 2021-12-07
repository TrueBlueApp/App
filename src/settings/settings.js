import React from "react";
import styles from "./styles";
import { app } from "../firebase-config";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  FormControl,
  Button,
  Paper,
  withStyles,
  Typography,
  CssBaseline,
} from "@material-ui/core";

const db = getFirestore();
const storage = getStorage();

class SettingsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      profilePicture: null,
    };
  }

  async componentDidMount() {
    this.setState({
      profilePicture: await this.getProfilePicture(),
    });
  }

  handleChangeImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      this.uploadFile(image);
    }
  };

  uploadFile = (file) => {
    const email = this.props.email;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `images/${email}`);
    uploadBytes(imageRef, file).then(function (snapshot) {
      window.location.reload(false);
    });
  };

  //Get profile picture from firebase storage
  async getProfilePicture() {
    const email = this.props.email;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `images/${email}`);
    var url = null;
    await getDownloadURL(imageRef)
      .then(function (profilePicture) {
        url = profilePicture;
      })
      .catch(function (error) {
        url =
          "https://eu.ui-avatars.com/api/?background=random&name=" +
          email +
          "&size=256x256";
      });
    return url;
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Dein Profilbild
          </Typography>
          <img
            src={this.state.profilePicture}
            alt="Profilepicture"
            className={classes.avatar}
          />

          <form
            className={classes.form}
            onSubmit={(e) => this.submitNewChat(e)}
          >
            <FormControl fullWidth>
              <Button variant="contained" component="label">
                Hochladen
                <input
                  type="file"
                  hidden
                  onChange={this.handleChangeImage}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </Button>
            </FormControl>
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

export default withStyles(styles)(SettingsComponent);
