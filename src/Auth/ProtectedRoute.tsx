import React, { PropsWithChildren, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";

export const ProtectedRoute: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentUser, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (loading) {
      // debug why animation isnt working on loading screen.
      // Could be corrupt Lottie file
      // Loading state could not be triggering do proper testing with console.log
      // console.log("Loading state: ", loading);
      // Show loading spinner for at least 2 seconds
      const timer = setTimeout(() => {
        if (mounted) {
          setShowLoading(false);
        }
      }, 2000);

      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    } else {
      setShowLoading(false);
    }
  }, [loading]);

  if (showLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser) {
    // User is not logged in
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
