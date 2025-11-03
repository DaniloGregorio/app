import { Navigate } from "react-router-dom";
import useAuth from "../hooks/auth";

function PrivateRoute({ children }) {
  const user = useAuth();

  if (!user) return <Navigate to="/login" />;
  return children;
}

export default PrivateRoute;
