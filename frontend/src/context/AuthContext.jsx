import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            const res = await loginUser(credentials);
            setUser(res.data);
            return true;
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            return false;
        }
    };

    const register = async (data) => {
        try {
            setUser(data);
            return true;
        } catch (err) {
            console.error("Error al registrar usuario:", err);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
