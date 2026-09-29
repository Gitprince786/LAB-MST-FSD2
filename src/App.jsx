import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Redirect Home to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <Admin />
            </RoleRoute>
          }
        />

        {/* Editor Only */}
        <Route
          path="/editor"
          element={
            <RoleRoute allowedRoles={["Editor"]}>
              <Editor />
            </RoleRoute>
          }
        />

        {/* Viewer Only */}
        <Route
          path="/viewer"
          element={
            <RoleRoute allowedRoles={["Viewer"]}>
              <Viewer />
            </RoleRoute>
          }
        />

        {/* Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}

export default App;