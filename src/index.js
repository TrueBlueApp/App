import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";

require("firebase/database");

firebase.initializeApp({
  apiKey: "AIzaSyCOFUA_vNrmlvq3iKoXS7n3uV_z-Endrz4",
  authDomain: "trueblue-90e10.firebaseapp.com",
  projectId: "trueblue-90e10",
  storageBucket: "trueblue-90e10.appspot.com",
  messagingSenderId: "704546647187",
  appId: "1:704546647187:web:f36500c93614deb2dd7166",
  measurementId: "G-NLCYW0WZ9S",
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
      <Route path="/dashboard" component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
