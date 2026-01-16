import { useState } from "react";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { useAuthForm } from "../components/AuthForm/useAuthForm";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";
import { AuthLayout } from "../components/AuthLayout/AuthLayout";

export default function Login() {
  const { submit, error, loading } = useAuthForm("/auth/login");
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (data: Record<string, string>) => {
    const res = await submit(data);
    login(res.token);
  };

  if (showRegister) {
    return (
      <AuthLayout>
        <Register switchToLogin={() => setShowRegister(false)} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthForm
        title="Logowanie"
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Hasło", type: "password" },
        ]}
        onSubmit={handleLogin}
        error={error}
        loading={loading}
        switchMode={() => setShowRegister(true)}
        switchText="Nie masz konta? Zarejestruj się"
      />
    </AuthLayout>
  );
}
