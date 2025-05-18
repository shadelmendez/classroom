import { useContext, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Avatar,
    IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SideBarContext } from '../context/SideBarContext';

const mockStudents = [
    { name: 'Janeiro Placido', avatar: 'J' },
    { name: 'Willy Q.V', avatar: 'W' }
];

export default function GradesPage() {
    const { themesData } = useContext(SideBarContext);

    const [grades, setGrades] = useState({});

    const handleGradeChange = (studentIndex, taskIndex, value) => {
        setGrades(prev => {
            const updated = { ...prev };
            if (!updated[studentIndex]) updated[studentIndex] = {};
            updated[studentIndex][taskIndex] = value;
            return updated;
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Calificaciones
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Ordenar por apellido</b></TableCell>
                            {themesData.flatMap(theme =>
                                theme.tasks.map((task, idx) => (
                                    <TableCell key={`${theme.title}-${idx}`}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {task.date || 'Sin fecha límite'}
                                        </Typography>
                                        <Typography variant="body2" color="primary">
                                            {task.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            de 100
                                        </Typography>
                                    </TableCell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography><b>Promedio de la clase</b></Typography>
                            </TableCell>
                            {themesData.flatMap(theme => theme.tasks.map((_, i) => (
                                <TableCell key={i}></TableCell>
                            )))}
                        </TableRow>
                        {mockStudents.map((student, sIdx) => (
                            <TableRow key={sIdx}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar src={student.avatar}>{student.avatar.length === 1 ? student.avatar : ''}</Avatar>
                                        {student.name}
                                    </Box>
                                </TableCell>
                                {themesData.flatMap((theme) =>
                                    theme.tasks.map((_, tIdx) => (
                                        <TableCell key={tIdx}>
                                            <TextField
                                                variant="standard"
                                                placeholder="/100"
                                                type="number"
                                                inputProps={{ max: 100, min: 0 }}
                                                value={grades[sIdx]?.[tIdx] || ''}
                                                onChange={(e) => handleGradeChange(sIdx, tIdx, e.target.value)}
                                                sx={{ width: 50 }}
                                            />
                                            <Typography variant="caption" color="success.main">
                                                Puntos
                                            </Typography>

                                        </TableCell>
                                    ))
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
