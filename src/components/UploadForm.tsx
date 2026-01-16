import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const UploadForm = () => {
    const { token } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [pesel, setPesel] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !pesel || !date) {
            setStatus('Wypełnij wszystkie pola!');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64File = reader.result?.toString().split(',')[1];

            try {
                setStatus('Wysyłanie...');
                const apiUrl = `${import.meta.env.VITE_API_URL}/upload`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        file: base64File,
                        fileName: file.name,
                        pesel,
                        date
                    })
                });

                if (response.ok) {
                    setStatus('Sukces! Dokument został zdeponowany i zaszyfrowany (RF-06).');
                    setFile(null);
                    setPesel('');
                } else {
                    const errorMsg = await response.text();
                    setStatus(`Błąd serwera: ${errorMsg}`);
                }
            } catch (err) {
                setStatus('Błąd połączenia z API. Sprawdź CORS.');
            }
        };
    };

    return (
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <input
                type="text"
                placeholder="PESEL (11 cyfr)"
                value={pesel}
                onChange={(e) => setPesel(e.target.value)}
                maxLength={11}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button type="submit" style={{
                backgroundColor: '#3498db',
                color: "white",
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}>
                Zdeponuj Dokumentację
            </button>
            {status && <p style={{
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: status.includes('Sukces') ? '#d4edda' : '#f8d7da',
                color: status.includes('Sukces') ? '#155724' : '#721c24'
            }}>{status}</p>}
        </form>
    );
};