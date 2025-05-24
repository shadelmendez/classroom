import { useContext, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, TextField, Avatar, Button, Alert
} from '@mui/material';
import { SideBarContext } from '../context/SideBarContext';
import { saveGrade } from '../api/api';

export default function GradesPage() {
    const { themesData, students, fetchUnscoredTasks, setIsScored, reloadThemes } = useContext(SideBarContext);
    const [grades, setGrades] = useState({});
    const [savedCount, setSavedCount] = useState(0);
    const [saving, setSaving] = useState(false);
    const [gradedPairs, setGradedPairs] = useState(new Set());

    const handleGradeChange = (studentId, taskId, value) => {
        if (value === '') {
            setGrades(prev => {
                const updated = { ...prev };
                if (updated[studentId]) {
                    delete updated[studentId][taskId];
                    if (Object.keys(updated[studentId]).length === 0) {
                        delete updated[studentId]; // borra la entrada del estudiante si está vacía
                    }
                }
                return updated;
            });
            return;
        }

        const parsed = Number(value);
        if (isNaN(parsed) || parsed < 0) return;

        setGrades(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [taskId]: parsed
            }
        }));
    };


    const handleSaveAllGrades = async () => {
        setSaving(true);
        let count = 0;
        const newGraded = new Set([...gradedPairs]);

        for (const studentId in grades) {
            for (const taskId in grades[studentId]) {
                const score = grades[studentId][taskId];
                if (score !== '' && score !== null && score !== undefined) {
                    try {
                        await saveGrade({
                            student_id: Number(studentId),
                            task_id: Number(taskId),
                            score: Number(score)
                        });

                        count++;
                        newGraded.add(`${studentId}-${taskId}`);
                    } catch (error) {
                        console.error(`Error al guardar nota estudiante ${studentId}, tarea ${taskId}:`, error);
                    }
                    await fetchUnscoredTasks(studentId);
                }
            }
        }

        await reloadThemes();
        setGrades({});
        setGradedPairs(newGraded);
        setSavedCount(count);
        setSaving(false);
    };


    const allTasksGraded = students.every(student =>
        themesData.flatMap(theme => theme.tasks)
            .every(task => gradedPairs.has(`${student.id}-${task.id}`))
    );


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Calificaciones</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Estudiante</b></TableCell>
                            {themesData.flatMap(theme =>
                                theme.tasks
                                    .filter(task => !task.is_scored) // solo tareas sin calificar
                                    .map(task => (
                                        <TableCell key={task.id}>
                                            <Typography variant="body2" fontWeight="bold">{task.title}</Typography>
                                            <Typography variant="caption" color="text.secondary">{task.date}</Typography>
                                        </TableCell>
                                    ))
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar>{student.avatar}</Avatar>
                                        {student.name}
                                    </Box>
                                </TableCell>
                                {themesData.flatMap(theme =>
                                    theme.tasks.filter(task => !task.is_scored).map(task => {
                                        const key = `${student.id}-${task.id}`;
                                        const alreadyGraded = gradedPairs.has(key);


                                        return (
                                            <TableCell key={task.id}>
                                                {alreadyGraded ? (
                                                    <Typography variant="caption" color="text.disabled">
                                                        Calificada
                                                    </Typography>
                                                ) : (
                                                    <TextField
                                                        type="number"
                                                        inputProps={{ min: 0, max: 100 }}
                                                        value={grades[student.id]?.[task.id] || ''}
                                                        error={grades[student.id]?.[task.id] < 0}
                                                        helperText={
                                                            grades[student.id]?.[task.id] < 0
                                                                ? "La nota no puede ser negativa"
                                                                : ""
                                                        }
                                                        onChange={(e) =>
                                                            handleGradeChange(student.id, task.id, e.target.value)
                                                        }
                                                    />
                                                )}
                                            </TableCell>
                                        );
                                    })
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="contained" onClick={handleSaveAllGrades} disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar calificaciones'}
                </Button>
                {savedCount > 0 && (
                    <Alert severity="success">
                        {savedCount} calificación(es) guardada(s) exitosamente.
                    </Alert>
                )}
            </Box>

            {allTasksGraded && (
                <Alert severity="info" sx={{ mt: 3 }}>
                    No hay tareas pendientes para calificar.
                </Alert>
            )}
        </Box>
    );
}
