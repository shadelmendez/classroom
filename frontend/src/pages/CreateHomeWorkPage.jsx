import {
    Box,
    TextField,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem, useTheme
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';
import SimpleDialogDemo from '../components/SimpleDialogDemo';

export default function CreateHomeWorkPage() {
    const { classId } = useContext(SideBarContext)
    const [title, setTitle] = useState("");
    const [instructions, setInstructions] = useState("");
    const [points, setPoints] = useState(0);
    const [dueDate, setDueDate] = useState(null);
    const [themes, setThemes] = useState("");

    const theme = useTheme()
    const handleSubmit = (e) => {
        e.preventDefault(); // evita recarga de la página

        // Aquí puedes manejar la lógica de envío, por ejemplo:
        console.log({
            title,
            instructions,
            points,
            dueDate: dueDate?.toISOString(), // si usas dayjs
            themes
        });

        // Podrías también hacer un fetch/axios para enviar la tarea
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: "space-between", gap: 5, width: "100%", backgroundColor: " rgb(248, 249, 250)" }}>
            <Box sx={{ width: "60%", height: "100%", borderRadius: 3, border: 1, borderColor: "#dadce0", padding: 4, backgroundColor: theme.palette.background.default }}>
                <TextField
                    label="Tarea"
                    variant="filled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Instrucciones (opcional)"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />
            </Box>

            <Box sx={{ width: "40%", border: 1, borderColor: "#dadce0", padding: 4, backgroundColor: theme.palette.background.default }}>
                <Typography sx={{ fontWeight: 500, color: "#5f6368", mb: 0.5 }}>
                    Para
                </Typography>
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <Select
                        value={classId}
                        disabled
                        displayEmpty
                    >
                        <MenuItem value={classId}>{classId}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 4 }}>
                    <Typography>Asignar a</Typography>
                    {/* <Button variant="outlined" startIcon={<PersonAddAlt1Icon />}>
                        Todos los estudiantes</Button> */}
                    <SimpleDialogDemo />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 4 }}>
                    <Typography>Fecha límite</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Seleccionar fecha"
                                value={dueDate}
                                onChange={(newValue) => setDueDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 4 }}>
                    <Typography>Tema</Typography>
                    <Select
                        value={theme}
                        onChange={(e) => setThemes(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value=""><em>Todos los temas</em></MenuItem>
                        <MenuItem value="tema1">Tema 1</MenuItem>
                        <MenuItem value="tema2">Tema 2</MenuItem>
                        <MenuItem value="tema3">Tema 3</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained">Asignar</Button>
            </Box>
        </Box>
    );
}
