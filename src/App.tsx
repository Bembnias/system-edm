import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // <-- Dodaj ten import!
import { useAuth } from "./context/AuthContext";

const App = () => {
    const { token, isLoading } = useAuth();

    // Opcjonalnie: zapobiega mignięciu strony logowania podczas sprawdzania sesji
    if (isLoading) {
        return <div style={{ color: 'white' }}>Ładowanie sesji...</div>;
    }

    return (
        <Router>
            <Routes>
                {/* Jeśli użytkownik ma token (jest zalogowany), przekieruj na dashboard [cite: 16, 45] */}
                <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Tutaj podmieniamy <h1> na zaimportowany komponent Dashboard */}
                <Route
                    path="/dashboard"
                    element={token ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;