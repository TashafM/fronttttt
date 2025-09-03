import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import toast, { Toaster } from "react-hot-toast";
import SignUp from "./pages/Auth";
// import Dashboard from "./Dashboard";
import Dashboard from "./pages/Dashboard";
import Refer from "./pages/Refer";

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/refer"
          element={
            <ProtectedRoute>
              <Refer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
