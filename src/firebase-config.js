import { initializeApp } from "firebase/app";

/*const firebaseConfig = {
  apiKey: "AIzaSyCOFUA_vNrmlvq3iKoXS7n3uV_z-Endrz4",
  authDomain: "trueblue-90e10.firebaseapp.com",
  projectId: "trueblue-90e10",
  storageBucket: "trueblue-90e10.appspot.com",
  messagingSenderId: "704546647187",
  appId: "1:704546647187:web:f36500c93614deb2dd7166",
  measurementId: "G-NLCYW0WZ9S",
};*/

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
