import { Login } from "auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavHeader from "./NavHeader";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route path="/vampires" />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
