import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "../components/AuthLayout/AuthLayout";

export default function Login() {
    const { login, isAuthenticated, isLoading, user, role } = useAuth();

    // Jeśli użytkownik jest już zalogowany, pokaż mu informacje o koncie
    if (isAuthenticated) {
        return (
            <AuthLayout>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>Zalogowano pomyślnie!</h2>
                    <p>Email: {user?.profile.email}</p>
                    <p>Rola w systemie: <strong>{role}</strong></p>
                    <button onClick={() => window.location.href = '/'}>Przejdź do panelu</button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: 'white' }}>System e-EDM</h2>
                <p style={{ color: '#ccc' }}>Bezpieczne deponowanie dokumentacji medycznej</p>

                {isLoading ? (
                    <p style={{ color: 'white' }}>Ładowanie...</p>
                ) : (
                    <button
                        onClick={() => login()}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Zaloguj się przez AWS Cognito
                    </button>
                )}
            </div>
        </AuthLayout>
    );
}