import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { UploadForm } from "../components/UploadForm";
import { DocumentList } from "../components/DocumentList";

export default function Dashboard() {
    const { logout, user, role } = useAuth();

    // Stany dla modułu wyszukiwania Lekarza (RF-10)
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSearch, setActiveSearch] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim().length > 0) {
            setActiveSearch(searchQuery);
            // Symulacja audytu (RF-11)
            console.log(`Audyt (RF-11): Lekarz ${user?.profile.email} uzyskał dostęp do dokumentacji: ${searchQuery}`);
        } else {
            alert("Proszę wpisać PESEL lub identyfikator pacjenta.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f4f7f9",
            color: "#2c3e50",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
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
                    <button onClick={logout} style={logoutButtonStyle}>Wyloguj się</button>
                </div>
            </nav>

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

                                {/* Sekcja Audytu i Wyszukiwania dla Lekarza - RF-10 */}
                                <section style={cardStyle}>
                                    <h3 style={{ color: "#2980b9" }}>Audyt i dostęp (RF-10)</h3>
                                    <p style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                                        Wyszukaj dokumentację po numerze PESEL. Każdy dostęp jest logowany (RF-11).
                                    </p>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <input
                                            type="text"
                                            placeholder="Wpisz PESEL pacjenta..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={inputStyle}
                                        />
                                        <button onClick={handleSearch} style={{ ...actionButtonStyle, marginTop: 0, width: 'auto' }}>
                                            Szukaj
                                        </button>
                                    </div>

                                    {/* Wyświetlanie wyników wyszukiwania dla Lekarza */}
                                    {activeSearch && (
                                        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                            <p style={{ fontSize: '0.85rem' }}>Dokumenty pacjenta: <strong>{activeSearch}</strong></p>
                                            <DocumentList searchPesel={activeSearch} />
                                        </div>
                                    )}
                                </section>
                            </>
                        ) : (
                            /* Widok dla Pacjenta - RF-02 */
                            <section style={{ ...cardStyle, gridColumn: "1 / -1" }}>
                                <h3 style={{ color: "#2980b9" }}>Moja Dokumentacja (RF-02)</h3>
                                <p style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                                    Poniżej znajduje się Twoja dokumentacja medyczna zdeponowana w systemie. Linki są zabezpieczone (Pre-signed URL).
                                </p>
                                <div style={{ marginTop: "15px" }}>
                                    <DocumentList />
                                </div>
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
    justifyContent: "flex-start"
};

const inputStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d9e0",
    fontSize: "0.9rem"
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

const logoutButtonStyle = {
    padding: "8px 16px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600" as const
};