import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        {/* jeśli użytkownik jest zalogowany, przekieruj na dashboard */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* przykładowa strona po zalogowaniu */}
        <Route path="/dashboard" element={token ? <h1>Dashboard</h1> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
