import { createContext, useContext, ReactNode } from "react";
import { useAuth as useCognitoAuth } from "react-oidc-context";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  role: "Lekarz" | "Pacjent" | null; // Spełnienie wymagania RF-02
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useCognitoAuth();

  // Wyciąganie roli z tokena JWT (wymaganie RF-02 i RF-03)
  const role = (auth.user?.profile["cognito:groups"] as string[])?.includes("Lekarz")
      ? "Lekarz"
      : "Pacjent";

  const login = () => auth.signinRedirect();
  const logout = () => auth.signoutRedirect();

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