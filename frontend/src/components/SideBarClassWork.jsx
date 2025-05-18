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
import SimpleDialogDemo from '../components/SimpleDialogDemo';
import { SideBarContext } from '../context/SideBarContext';

import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";


export default function SideBarClassWork() {
    const { classId, points, setPoints, dueDate, setDueDate } = useContext(SideBarContext)
    const navigate = useNavigate();
    const theme = useTheme()
    return (
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
                <SimpleDialogDemo />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
                <Typography>Puntos</Typography>
                <TextField
                    id="outlined-number"
                    value={points}
                    type="number"
                    onChange={(e) => setPoints(e.target.value)}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
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
            <Button type="submit" variant="contained" onClick={() => navigate(`/class/${classId}/work`)}>Asignar</Button>
        </Box>
    )
}
