import React, { Component } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";

// routes
// import Homepage from "../Homepage";
import SignIn from "../SignIn";
import ForgotPassword from "../ForgotPassword";
import Welcome from "../Welcome";
import AuthViewWrapper from "../auth";
import FourZeroFour from "../notFound";
import BudgetUploadPage from "../auth/BudgetUploadPage";
import ProjectSelection from "../auth/ProjectSelection";
import ContractAndTenderUpload from "../auth/Contracts";
import Projects from "../auth/Projects";
import Users from "../auth/Users";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<SignIn />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="welcome" element={<Welcome />} />

            <Route path="/d" element={<AuthViewWrapper />}>
              <Route index path="budget" element={<BudgetUploadPage />} />
              <Route path="project-selection" element={<ProjectSelection />} />
              <Route path="contracts" element={<ContractAndTenderUpload />} />
              <Route path="projects" element={<Projects />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>

          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
