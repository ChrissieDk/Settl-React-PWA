// create a sign in screen using firebase
// the user needs to be able to add an email and password that they previously set
// the sign in process should ultimately navigate to the dashboard upon success

// import React, { useState } from "react";
// import { auth } from "../../firebase-config";
// import { useHistory } from "react-router-dom";

// const SignIn: React.FC = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const history = useHistory();

//   const handleSignIn = async () => {
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       history.push("/dashboard");
//     } catch (error) {
//       console.error("Error signing in", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold mb-4">Sign In</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 mb-4"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 mb-4"
//       />
//       <button
//         onClick={handleSignIn}
//         className="bg-blue-500 text-white rounded-md p-2"
//       >
//         Sign In
//       </button>
//     </div>
//   );
// };
