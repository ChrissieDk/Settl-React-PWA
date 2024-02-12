import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const Auth = () => {
  useEffect(() => {
    // FirebaseUI config
    const uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Add other providers here as needed
      ],
      // Use this to configure other aspects like signInSuccessUrl, callbacks, etc.
    };

    // This checks if a FirebaseUI instance already exists and reuses it; otherwise, it creates a new instance.
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    // The start method will find the element with the id 'firebaseui-auth-container' and render the sign-in UI.
    ui.start("#firebaseui-auth-container", uiConfig);

    // Cleanup function: This is called when the component unmounts.
    return () => {
      ui.delete();
    };
  }, []); // The empty array ensures this effect runs only once after the initial render.

  return <div id="firebaseui-auth-container"></div>;
};

export default Auth;
