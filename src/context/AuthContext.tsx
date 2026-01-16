import { createContext, useContext, ReactNode } from "react";
import { useAuth as useCognitoAuth } from "react-oidc-context";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
    role: "Lekarz" | "Pacjent" | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = useCognitoAuth();

    // Pobieranie roli z grup Cognito (RF-02)
    const groups = auth.user?.profile["cognito:groups"] as string[] | undefined;
    const role = groups?.includes("Lekarz") ? "Lekarz" : "Pacjent";

    const login = () => auth.signinRedirect();

    const logout = () => {
        auth.removeUser();

        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const logoutUri = encodeURIComponent(import.meta.env.VITE_COGNITO_REDIRECT_URI);
        const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

        // Pełne wylogowanie z sesji AWS
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated: auth.isAuthenticated,
            user: auth.user,
            token: auth.user?.access_token || null,
            login,
            logout,
            isLoading: auth.isLoading,
            role: auth.isAuthenticated ? role : null
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};