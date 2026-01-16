import { useAuth } from "../context/AuthContext";
import { UploadForm } from "../components/UploadForm";

export default function Dashboard() {
    const { logout, user, role } = useAuth();

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f4f7f9",
            color: "#2c3e50",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            {/* Pasek boczny / Header */}
            <nav style={{
                backgroundColor: "#ffffff",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ margin: 0, color: "#3498db" }}>System e-EDM</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{ fontSize: "0.9rem" }}>
                        Zalogowany jako: <strong>{user?.profile.email}</strong>
                    </span>
                    <button
                        onClick={logout}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Wyloguj się
                    </button>
                </div>
            </nav>

            {/* Główna treść */}
            <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
                }}>
                    <h1 style={{ marginTop: 0 }}>Panel Sterowania</h1>
                    <div style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        backgroundColor: role === "Lekarz" ? "#d4edda" : "#fff3cd",
                        color: role === "Lekarz" ? "#155724" : "#856404",
                        fontWeight: "bold",
                        marginBottom: "20px"
                    }}>
                        Rola: {role}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                        {role === "Lekarz" ? (
                            <>
                                {/* Sekcja Deponowania dla Lekarza - RF-04 */}
                                <section style={cardStyle}>
                                    <h3 style={{ color: "#2980b9" }}>Deponowanie (RF-04)</h3>
                                    <p style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                                        Prześlij dokumentację medyczną. Plik zostanie automatycznie zaszyfrowany kluczem KMS (RF-06).
                                    </p>
                                    <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                                        <UploadForm />
                                    </div>
                                </section>

                                {/* Sekcja Audytu dla Lekarza - RF-10 */}
                                <section style={cardStyle}>
                                    <h3 style={{ color: "#2980b9" }}>Audyt i dostęp (RF-10)</h3>
                                    <p style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                                        Przeglądaj historię dokumentacji po numerze PESEL. Każdy dostęp jest logowany (RF-11).
                                    </p>
                                    <button style={actionButtonStyle}>Wyszukaj pacjenta</button>
                                </section>
                            </>
                        ) : (
                            /* Widok dla Pacjenta - RF-02 */
                            <section style={{ ...cardStyle, gridColumn: "1 / -1" }}>
                                <h3 style={{ color: "#2980b9" }}>Moja Dokumentacja (RF-02)</h3>
                                <p style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                                    Tutaj znajdziesz swoje wyniki badań i karty pacjenta zdeponowane przez lekarzy.
                                </p>
                                <button style={actionButtonStyle}>Pobierz moją dokumentację</button>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

const cardStyle = {
    padding: "25px",
    border: "1px solid #e1e8ed",
    borderRadius: "12px",
    backgroundColor: "#fafcfd",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between"
};

const actionButtonStyle = {
    padding: "12px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold" as const,
    marginTop: "15px",
    transition: "background-color 0.2s"
};