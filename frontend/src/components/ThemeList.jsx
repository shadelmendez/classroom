import { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { SideBarContext } from '../context/SideBarContext';
import ThemeItem from './ThemeItem';

export default function ThemeList() {
    const { themesData, students } = useContext(SideBarContext);

    const hasPendingTasks = themesData.some(theme => theme.tasks?.length > 0);

    if (!hasPendingTasks) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Sin tareas pendientes para calificar.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Todo está al día 🎉
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Los temas aparecerán aquí una vez que se les asigne al menos una tarea.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            {themesData.map((theme, index) => (
                <ThemeItem key={index} theme={theme} />
            ))}
        </>
    );
}
