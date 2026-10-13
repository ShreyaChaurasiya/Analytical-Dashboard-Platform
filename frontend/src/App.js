import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import LoginOtp from "./pages/LoginOtp";
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/otp" element={<LoginOtp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
