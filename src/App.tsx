import React, { useEffect } from "react";
import "./App.css";
import { StickyNavbar } from "./Navbar";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import FindNetwork from "./FindNetwork";
import Login from "./components/SignIn/Login";
import Signup from "./components/SignUp/SignUp";
import UserProfile from "./UserProfile";
import { AuthProvider } from "./Auth/AuthContext";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
// import { getRedirectResult } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "./firebase-config";

const App = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     try {
  //       console.log("Checking redirect result...");
  //       const result = await getRedirectResult(auth);
  //       if (result) {
  //         console.log("Redirect result received:", result);
  //         const user = result.user;
  //         const idToken = await user.getIdToken();
  //         localStorage.setItem("bearer", idToken);
  //         navigate("/Dashboard");
  //       } else {
  //         console.log("No redirect result found.");
  //       }
  //     } catch (error) {
  //       console.error("Error checking redirect result:", error);
  //     }
  //   };

  //   handleRedirect();
  // }, [navigate]);

  return (
    <AuthProvider>
      <div className="App">
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route
            path="/UserProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
