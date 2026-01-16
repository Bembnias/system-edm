import { AuthForm } from "../components/AuthForm/AuthForm";
import { useAuthForm } from "../components/AuthForm/useAuthForm";

interface Props {
  switchToLogin?: () => void;
}

export default function Register({ switchToLogin }: Props) {
  const { submit, error, loading } = useAuthForm("/auth/register");

  return (
    <AuthForm
      title="Rejestracja"
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Hasło", type: "password" },
      ]}
      onSubmit={submit}
      error={error}
      loading={loading}
      switchMode={switchToLogin}
      switchText="Wróć do logowania"
    />
  );
}
