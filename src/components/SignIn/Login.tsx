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
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Navigate to Dashboard or do something with the user info
        navigate("/Dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage);
      });
  };

  // Email / Password login
  const onLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/Dashboard");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <main className="flex h-screen bg-gray-100">
        <section className="m-auto w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center text-gray-800">
            Login to Your Account
          </h2>
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={onLogin}
              >
                Login
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="inline-flex items-center  bg-gray-100 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-200 active:bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                onClick={() => signInWithGoogle()}
              >
                <FcGoogle size={25} />
              </button>
            </div>
            <div className="text-right mt-2 inline-flex items-center">
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
