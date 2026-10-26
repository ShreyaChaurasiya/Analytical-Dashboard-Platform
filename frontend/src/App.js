import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import LoginOtp from "./pages/LoginOtp";
import ForgetPassword from "./pages/ForgetPassword";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Reports from "./pages/Reports";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/help" element={<section className="info-page"><p className="dashboard-eyebrow">SUPPORT</p><h1>Help</h1><p>To get started, open Dashboard, upload a dataset, or download the CSV template to prepare your data.</p><a href="mailto:support@example.com">Contact support</a></section>} />
        <Route path="/about" element={<section className="info-page"><p className="dashboard-eyebrow">ABOUT THE PLATFORM</p><h1>Analytical Dashboard Platform</h1><p>A platform from C-DAC, Delhi to help make data analysis and reporting more accessible.</p></section>} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/otp" element={<LoginOtp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
