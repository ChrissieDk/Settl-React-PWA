import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoadingSpinner } from "../components/loadingSpinner/LoadingSpinner";
export const ProtectedRoute: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optionally, return a loading indicator here
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
