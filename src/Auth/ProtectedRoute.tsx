import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optionally, return a loading indicator here
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // User is not logged in
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
