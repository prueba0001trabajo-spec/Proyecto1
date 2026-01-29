import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { session } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={session ? "/tasks" : "/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/tasks"
        element={session ? <Tasks /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
