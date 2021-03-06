import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";
import { app } from "./firebase-config";
import { Navigate } from "react-router";
import ResetpasswordComponent from "./resetpassword/resetpassword";

require("dotenv").config();
require("firebase/database");

const routing = (
  <Router>
    <div id="routes-container">
      <Routes>
        <Route exact path="/" element={<LoginComponent />} />
        <Route exact path="/signup" element={<SignupComponent />} />
        <Route exact path="/dashboard" element={<DashboardComponent />} />
        <Route
          exact
          path="/reset-password"
          element={<ResetpasswordComponent />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
