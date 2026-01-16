import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { logout, user, role } = useAuth();

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f4f7f9", // Jasnoszare, profesjonalne tło
            color: "#2c3e50",           // Ciemna, czytelna czcionka
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
                                <section style={cardStyle}>
                                    <h3>Deponowanie (RF-04)</h3>
                                    <p>Prześlij nową dokumentację medyczną pacjenta.</p>
                                    <button style={actionButtonStyle}>Dodaj plik PDF/DICOM</button>
                                </section>
                                <section style={cardStyle}>
                                    <h3>Audyt i dostęp (RF-10)</h3>
                                    <p>Przeglądaj historię dokumentacji po numerze PESEL.</p>
                                    <button style={actionButtonStyle}>Wyszukaj pacjenta</button>
                                </section>
                            </>
                        ) : (
                            <section style={{ ...cardStyle, gridColumn: "1 / -1" }}>
                                <h3>Moja Dokumentacja (RF-02)</h3>
                                <p>Tutaj znajdziesz swoje wyniki badań i karty pacjenta.</p>
                                <button style={actionButtonStyle}>Pobierz dokumentację</button>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

const cardStyle = {
    padding: "20px",
    border: "1px solid #e1e8ed",
    borderRadius: "8px",
    backgroundColor: "#fafcfd"
};

const actionButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold"
};