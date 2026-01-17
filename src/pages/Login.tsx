import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "../components/AuthLayout/AuthLayout";

export default function Login() {
    const { login, isAuthenticated, isLoading, user, role } = useAuth();

    if (isAuthenticated) {
        return (
            <AuthLayout>
                <div style={containerStyle}>
                    <h2 style={{ color: '#2563eb', marginBottom: '10px' }}>Witaj ponownie!</h2>
                    <p style={{ color: '#64748b', marginBottom: '20px' }}>
                        Jesteś zalogowany jako: <br/>
                        <strong>{user?.profile.email}</strong>
                    </p>
                    <div style={roleBadgeStyle(role)}>
                        Rola: {role}
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={primaryButtonStyle}
                    >
                        Przejdź do panelu sterowania
                    </button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div style={containerStyle}>
                <h1 style={logoTextStyle}>System e-EDM</h1>
                <p style={subtitleStyle}>
                    Bezpieczne deponowanie i audytowanie <br/>
                    elektronicznej dokumentacji medycznej.
                </p>

                {isLoading ? (
                    <p style={{ color: '#2563eb', fontWeight: 'bold' }}>Inicjalizacja bezpiecznego połączenia...</p>
                ) : (
                    <button
                        onClick={() => login()}
                        style={primaryButtonStyle}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                        Zaloguj się przez AWS Cognito
                    </button>
                )}

                <div style={footerStyle}>
                    System zgodny z normami RODO i szyfrowaniem KMS.
                </div>
            </div>
        </AuthLayout>
    );
}

const containerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const logoTextStyle: React.CSSProperties = {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#2563eb',
    marginBottom: '15px',
    letterSpacing: '-1px'
};

const subtitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '35px',
    lineHeight: '1.6'
};

const primaryButtonStyle: React.CSSProperties = {
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    width: '100%',
    maxWidth: '300px'
};

const footerStyle: React.CSSProperties = {
    marginTop: '50px',
    fontSize: '0.75rem',
    color: '#94a3b8',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '20px',
    width: '100%'
};

const roleBadgeStyle = (role: string | null): React.CSSProperties => ({
    padding: '6px 16px',
    borderRadius: '20px',
    backgroundColor: role === 'Lekarz' ? '#d4edda' : '#fff3cd',
    color: role === 'Lekarz' ? '#155724' : '#856404',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    marginBottom: '25px',
    display: 'inline-block'
});