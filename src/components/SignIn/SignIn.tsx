import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
