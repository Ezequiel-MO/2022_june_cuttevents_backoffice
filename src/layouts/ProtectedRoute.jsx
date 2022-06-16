import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {auth && auth._id ? (
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default ProtectedRoute;
