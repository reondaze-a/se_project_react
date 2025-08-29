import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/CurrentuserContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn, loading } = useAuth();

  const location = useLocation();
  const from = location.state?.from || "/";

  if (loading) {
    return <div>Loading...</div>; // Loading state handling to check auth status
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
