import React from "react";
import "./App.css";
import { StickyNavbar } from "./Navbar";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import FindNetwork from "./FindNetwork";
import Login from "./components/SignIn/Login";
import Signup from "./components/SignUp/SignUp";
import UserProfile from "./UserProfile";
import ContactUs from "./components/contactUs";
import { AuthProvider } from "./Auth/AuthContext";
import { ProtectedRoute } from "./Auth/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Router basename="Settl-React-PWA/">
          <StickyNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Example protected route */}

            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/signUp" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/FindNetwork" element={<FindNetwork />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route
              path="/UserProfile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            {/* <Route path="*" element={<NotFoundPage />}  */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
