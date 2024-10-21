// src/components/restrictedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const RestrictedRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? component : <Navigate to={redirectTo} />;
};
export default RestrictedRoute;
