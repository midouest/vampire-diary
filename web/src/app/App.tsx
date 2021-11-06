import { Login } from "auth/Login";
import { PrivateRoute } from "auth/PrivateRoute";
import { DiaryPage } from "diary/DiaryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VampiresPage } from "vampire/VampiresPage";
import { NavHeader } from "./NavHeader";

export function App() {
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
                <VampiresPage />
              </PrivateRoute>
            }
          />
          <Route path="/settings" />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
