import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = ({ email, password }) => {
        // Lógica de autenticación real (por ahora fake)
        if (email && password) {
            setUser({ email });
            return true;
        }
        return false;
    };

    const register = ({ email, password }) => {
        // Registro simulado
        setUser({ email });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
