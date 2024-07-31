import { Navigate } from "react-router-dom";

function ProtectRouter({ children, user }) {
  return user ? children : <Navigate to="/login" />;
}

export default ProtectRouter;
