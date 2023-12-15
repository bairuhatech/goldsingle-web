import { Navigate } from "react-router-dom";
import React from "react";
function ProtectedRoute({ isSignedIn, children }: any) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
