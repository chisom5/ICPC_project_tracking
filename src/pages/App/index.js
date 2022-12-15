import React, { Component } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { ProtectedStaffRoute } from "./protectedRoute";

// routes
import Homepage from "../Homepage";
import SignIn from "../SignIn";
import ForgotPassword from "../ForgotPassword";
import Welcome from "../Welcome";
import AuthViewWrapper from '../auth';
import FourZeroFour from "../notFound";
import Budgetupload from "../auth/BudgetUpload";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="welcome" element={<Welcome />} />

          <Route path="/d" element={<AuthViewWrapper />}>
          <Route index path="budget" element={<Budgetupload />} />

          </Route>

          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
