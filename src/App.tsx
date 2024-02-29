import React from "react";

import "./App.css";
import { StickyNavbar } from "./Navbar";
import Dashboard from "./Dashboard";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router basename="/Settl-React-PWA">
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
