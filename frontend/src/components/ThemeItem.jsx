import { Box, Typography, List, Divider } from '@mui/material';
import TaskItem from './TaskItem';

export default function ThemeItem({ theme }) {
    const hasTasks = Array.isArray(theme.tasks) && theme.tasks.length > 0;

    return (
        <Box sx={{ my: 3 }}>
            <Typography variant="h5" gutterBottom>{theme.title}</Typography>

            {!hasTasks ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        pl: 2,
                        fontStyle: 'italic',
                        opacity: 0.8
                    }}
                >
                    Los estudiantes verán este tema una vez que se le agregue trabajo.
                </Typography>
            ) : (
                <List>
                    {theme.tasks.map((task, i) => (
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
