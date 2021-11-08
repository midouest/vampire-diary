import { Login } from "auth/Login";
import { PrivateRoute } from "auth/PrivateRoute";
import { selectIsLoggedIn } from "auth/slice";
import { DiaryPage } from "diary/DiaryPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { VampirePage } from "vampire/VampirePage";
import { useAppSelector } from "./hooks";
import { NavHeader } from "./NavHeader";

export function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route
            path="/vampires/:id"
            element={
              <PrivateRoute>
                <DiaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vampires"
            element={
              <PrivateRoute>
                <VampirePage />
              </PrivateRoute>
            }
          />
          <Route path="/settings" />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/vampires" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
