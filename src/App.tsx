import React from "react";

import "./App.css";
import { StickyNavbar } from "./Navbar";
import Dashboard from "./Dashboard";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <StickyNavbar />
        <Routes>
          {/* <Route path="/homepage" element={<HomePage />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
