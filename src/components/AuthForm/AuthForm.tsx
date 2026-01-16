import styles from "./AuthForm.module.css";

interface Props {
  title: string;
  onSubmit: (data: Record<string, string>) => void;
  fields: { name: string; label: string; type?: string }[];
  error?: string | null;
  loading?: boolean;
  switchMode?: () => void; 
  switchText?: string; 
}

export const AuthForm = ({
  title,
  fields,
  onSubmit,
  error,
  loading,
  switchMode,
  switchText,
}: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    onSubmit(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>{title}</h2>

        {fields.map((f) => (
          <div key={f.name} className={styles.field}>
            <label>{f.label}</label>
            <input name={f.name} type={f.type || "text"} required />
          </div>
        ))}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Przetwarzanie..." : "Zatwierdź"}
        </button>

        {switchMode && switchText && (
          <button
            type="button"
            className={styles.switchButton}
            onClick={switchMode}
          >
            {switchText}
          </button>
        )}
      </form>
    </div>
  );
};

