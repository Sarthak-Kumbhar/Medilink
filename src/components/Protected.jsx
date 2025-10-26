import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = () => {
  const { isAuthenticated, isLoading } = useSelector((e) => e.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;
