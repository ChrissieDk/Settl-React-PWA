import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const email = "user@example.com"; // Replace with the actual email
const password = "password123";

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
