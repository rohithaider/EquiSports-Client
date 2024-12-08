import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user || !user?.email) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the user is authenticated, allow access to the requested page
  return children;
}
