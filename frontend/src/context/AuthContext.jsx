import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Login con FastAPI
    // AuthContext.js
    const login = async (credentials) => {
        try {
            const res = await loginUser(credentials);
            setUser(res.data); // res.data debe incluir is_student
            return true;
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            return false;
        }
    };

    // Registro con FastAPI
    const register = async (data) => {
        try {
            // const res = await registerUser(data);
            setUser(data); // opcional
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
