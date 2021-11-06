import { useAppSelector } from "app/hooks";
import { Navigate } from "react-router";
import { selectIsLoggedIn } from "./slice";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
