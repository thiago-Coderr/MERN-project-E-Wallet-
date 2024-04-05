import "./App.scss";
import HomePage from "./pages/HomePage";
import Business from "./pages/Business";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MultiAccount from "./pages/MultiAccount";
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<Business />} />
          <Route path="/multi-currency-account" element={<MultiAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
