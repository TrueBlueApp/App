import React from "react";
import styles from "./styles";
import { app } from "../firebase-config";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  FormControl,
  Input,
  Button,
  Paper,
  InputLabel,
  withStyles,
  Typography,
  CssBaseline,
  Avatar,
} from "@material-ui/core";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

class SettingsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hasProfilePicture: false,
    };
  }

  async componentDidMount() {
    /*if (this.doesUserHasProfilePicture()) {
      this.setState({ hasProfilePicture: true });
      this.getProfilePicture();
    }*/
    console.log(await this.doesUserHasProfilePicture());
  }

  handleChangeImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      this.uploadFile(image);
    }
  };

  uploadFile = (file) => {
    const email = auth.currentUser.email;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `images/${email}`);
    uploadBytes(imageRef, file).then(function (snapshot) {
      window.location.reload(false);
    });
  };

  //Get profile picture from firebase storage
  getProfilePicture() {
    const email = auth.currentUser.email;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `images/${email}`);
    getDownloadURL(imageRef).then(function (url) {
      return url;
    });
  }

  //Check if user has profile picture
  async doesUserHasProfilePicture() {
    const email = auth.currentUser.email;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `images/${email}`);
    await getDownloadURL(imageRef)
      .then(function (url) {
        console.log(url);
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
    return false;
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
          {this.doesUserHasProfilePicture() ? <p>Ja</p> : <p>Nein</p>}

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
                  accept="image/png"
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
