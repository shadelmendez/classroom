import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Box, Button, TextField, Typography, Paper,
} from "@mui/material";
import { getSidebarData } from "../api/sidebar";



export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        is_student: false
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(form); // login desde AuthContext

        if (success) {
            // fetch secciones para obtener el primer classId disponible
            const sections = await getSidebarData();
            const allItems = sections.flatMap((section) => section.items);
            const firstClassId = allItems[0]?.to.replace("/", "");

            if (firstClassId) {
                navigate(`/class/${firstClassId}/overview`);
            } else {
                navigate("/"); // fallback
            }
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
                        Registrarme
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
