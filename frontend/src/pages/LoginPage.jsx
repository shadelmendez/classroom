import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Box, Button, TextField, Typography, Paper
} from "@mui/material";

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(form);
        if (success) {
            navigate("/");
        } else {
            setError("Credenciales inválidas");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" mb={2}>Iniciar sesión</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Correo"
                        name="email"
                        type="email"
                        fullWidth
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        fullWidth
                        value={form.password}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Iniciar sesión
                    </Button>
                    <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/register")}>
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
