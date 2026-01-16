import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider as CognitoProvider } from "react-oidc-context";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

// Pobieranie bezpiecznych danych z pliku .env
const cognitoAuthConfig = {
    authority: import.meta.env.VITE_COGNITO_AUTHORITY,
    client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
    response_type: "code",
    scope: "phone openid email",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <CognitoProvider {...cognitoAuthConfig}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </CognitoProvider>
    </React.StrictMode>
);