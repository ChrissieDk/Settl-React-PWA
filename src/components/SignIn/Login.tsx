import React, { useState } from "react";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { sendPasswordResetEmail } from "firebase/auth";
import { login } from "../../Services/data.service";
import settlLogo from "../../img/Homepage/Settl logo.png";
import bgLogin from "../../img/Authflow/bg_login.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot password function
  const handleForgotPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert("Failed to send password reset email. Please try again.");
      });
  };

  // Maybe change to signInWithRedirect to avoid error in console ?
  // Google login
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      localStorage.setItem("bearer", idToken);
      console.log("Bearer " + idToken);

      const loginResponse = await login();
      localStorage.setItem(
        "userIsMerchant",
        loginResponse.userIsMerchant.toString()
      );
      navigate("/Dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  // Email / Password login
  // const onLogin = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(async (userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       user.getIdToken().then((idToken) => {
  //         localStorage.setItem("bearer", idToken);
  //         console.log("Bearer " + idToken);
  //       });
  //       const userSession = await login();
  //       navigate("/Dashboard");
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  // };
  const onLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      localStorage.setItem("bearer", idToken);
      console.log("Bearer " + idToken);

      const loginResponse = await login();
      localStorage.setItem(
        "userIsMerchant",
        loginResponse.userIsMerchant.toString()
      );
      navigate("/Dashboard");
      console.log(user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  // const getUserIdLogin = async (firebaseId: string) => {
  //   return getUserId(firebaseId)
  //     .then((response) => {
  //       console.log("User registered in the database:", response);
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // };

  return (
    <>
      <main
        className="flex bg-cover bg-center"
        style={{ backgroundImage: `url(${bgLogin})`, height: "90vh" }}
      >
        <section className="m-auto w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
          <img src={settlLogo} alt="Settl Logo" className="h-16 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-center text-blue-500 mt-2 lg:mt-6">
            Let’s get you logged in
          </h1>
          <h2 className="text-md font-button text-center text-black">
            Welcome back!
          </h2>

          {/* Google and Facebook Login Buttons */}
          <div className="flex flex-col items-center my-4">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 mb-2 bg-gray-100 border border-gray-300 rounded-md font-semibold text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={signInWithGoogle}
            >
              <FcGoogle size={20} className="mr-2" />
              Log in with Google
            </button>
            {/* <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-semibold text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={signInWithFacebook}
            >
              <FaFacebookF size={20} className="mr-2 text-blue-600" />
              Log in with Facebook
            </button> */}
          </div>

          {/* Horizontal Split with 'OR' */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-orange-500"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-orange-500"></div>
          </div>

          {/* Login Form */}
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-md font-button text-black"
                aria-required="true"
              >
                Email address
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-md font-button text-black"
                aria-required="true"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={onLogin}
              >
                Log In
              </button>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500 text-sm"
                onClick={() => handleForgotPassword(email)}
                disabled={!email}
              >
                Forgot password?
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            No account yet?
            <NavLink
              to="/signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign up
            </NavLink>
          </p>
        </section>
      </main>
    </>
  );
};

export default Login;
