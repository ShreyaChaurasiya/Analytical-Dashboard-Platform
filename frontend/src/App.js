import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import LoginOtp from "./pages/LoginOtp";
import ForgetPassword from "./pages/ForgetPassword";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/otp" element={<LoginOtp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
