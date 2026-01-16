import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Document {
    name: string;
    url: string;
}

interface DocumentListProps {
    searchPesel?: string;
}

export const DocumentList = ({ searchPesel }: DocumentListProps) => {
    const { token, user } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchDocuments = async () => {
        const targetPesel = searchPesel || user?.profile.email;

        if (!targetPesel) return;

        try {
            setLoading(true);
            setError('');

            const apiUrl = `${import.meta.env.VITE_API_URL}/documents?pesel=${targetPesel}`;

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
            } else {
                setDocuments([]);
                setError('Nie znaleziono dokumentów dla tego identyfikatora.');
            }
        } catch (err) {
            setError('Błąd połączenia z serwerem.');
        } finally {
            setLoading(false);
        }
    };

    // Odświeżaj listę za każdym razem, gdy zmieni się searchPesel (RF-10)
    useEffect(() => {
        fetchDocuments();
    }, [searchPesel]);

    if (loading) return <p>Ładowanie dokumentacji...</p>;

    return (
        <div style={{ marginTop: '10px' }}>
            {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{error}</p>}

            {documents.length === 0 && !error ? (
                <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Brak dostępnych dokumentów.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {documents.map((doc, index) => (
                        <li key={index} style={{
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            marginBottom: '5px',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid #e1e8ed'
                        }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{doc.name}</span>
                            <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: '5px 12px',
                                    backgroundColor: '#27ae60',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                Pobierz
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            {documents.length > 0 && (
                <button
                    onClick={fetchDocuments}
                    style={{
                        marginTop: '10px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        background: 'none',
                        border: '1px solid #3498db',
                        color: '#3498db',
                        padding: '4px 8px',
                        borderRadius: '4px'
                    }}
                >
                    Odśwież listę
                </button>
            )}
        </div>
    );
};