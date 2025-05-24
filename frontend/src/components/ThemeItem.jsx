import { Box, Typography, List, Divider } from '@mui/material';
import TaskItem from './TaskItem';
import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';

export default function ThemeItem({ theme }) {
    const hasTasks = theme.tasks?.length > 0;

    const scoredTasks = theme.tasks.filter(t => t.is_scored);
    const unScoredTasks = theme.tasks.filter(t => !t.is_scored);

    return (
        <Box sx={{ my: 3 }}>
            <Typography variant="h5" gutterBottom>{theme.title}</Typography>

            {unScoredTasks.length === 0 ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        pl: 2,
                        fontStyle: 'italic',
                        opacity: 0.8
                    }}
                >
                    Todas las tareas de este tema ya fueron calificadas.
                </Typography>
            ) : (
                <List>
                    {unScoredTasks.map((task, i) => (
                        <div key={i}>
                            <Divider />
                            <TaskItem task={task} themeTitle={theme.title} />
                        </div>
                    ))}
                </List>
            )}
        </Box>
    );
}
