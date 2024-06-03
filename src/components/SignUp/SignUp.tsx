import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { register } from "../../Services/data.service";
import logoBlur from "../../img/Authflow/settl_blur.png";
import dino from "../../img/Authflow/origamisaur.png";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Maybe change to signInWithRedirect to avoid error in console ?
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Navigate to Dashboard or do something with the user info
        await registerLocal(user);
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

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await registerLocal(user);
        navigate("/Dashboard");
        sendEmailVerification(userCredential.user).then(() => {
          console.log("Email verification sent", userCredential.user.email);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const registerLocal = async (user: any) => {
    const userIn = {
      email: user.email,
      password: password || "test", // Using the password or default if none provided
      firebaseId: user.uid,
      username: user.email,
    };

    return register(userIn)
      .then((response) => {
        console.log("User registered in the database:", response);
        return sendEmailVerification(user);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <main
      className="relative flex bg-no-repeat bg-contain bg-center bg-origin-content mx-2"
      style={{ backgroundImage: `url(${logoBlur})`, height: "90vh" }}
    >
      <img
        src={dino}
        alt="Origamisaur"
        className="absolute left-10 -bottom-6 w-[40%] h-auto hidden md:block"
        style={{ zIndex: 1 }}
      />
      <section className=" m-auto lg:h-[92%] w-full max-w-md px-8 py-6 bg-teal-50 shadow-md [clip-path:polygon(0%_0%,100%_3%,100%_98%,0%_100%)]">
        <div>
          <h1 className="text-4xl font-bold text-center text-blue-500 mt-2 lg:mt-6">
            Let’s sign you up
          </h1>
          <h1 className="text-md font-button text-center text-black mt-2">
            You're one step closer to unlocking the door to healthcare freedom.
          </h1>
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

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-orange-500"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-orange-500"></div>
          </div>

          <form onSubmit={onSubmit} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-button text-black"
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
                className="block text-sm font-button text-black"
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
              className="w-[50%] px-4 py-2 mb-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
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
