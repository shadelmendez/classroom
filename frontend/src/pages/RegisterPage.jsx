import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Box, Button, TextField, Typography, Paper, Checkbox, FormControlLabel
} from "@mui/material";
import { registerUser } from "../api/api";
import { SideBarContext } from '../context/SideBarContext';



export default function RegisterPage() {
    const { register } = useContext(AuthContext);
    const { classId } = useContext(SideBarContext)
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [form, setForm] = useState({ email: "", password: "", is_student: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(form);
            register(res.data); // opcional: guardar en contexto
            navigate(`/class/${classId}/overview`);
        } catch (err) {
            console.log(err)
            setError("Error al registrar usuario");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" mb={2}>Crear cuenta</Typography>
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.is_student}
                                onChange={handleChange}
                                name="is_student"
                            />
                        }
                        label="¿Eres estudiante?"
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Registrarse
                    </Button>
                    <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
                        Ya tengo cuenta
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
