import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className="flex h-screen bg-gray-100">
      <section className="m-auto w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Creat an account
          </h1>
          <form onSubmit={onSubmit} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="email"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
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
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?
            <NavLink
              to="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign in
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
