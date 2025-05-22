import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Typography, Button, List, ListItem, ListItemText,
} from '@mui/material';
import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';
import { deleteTask } from '../api/api';

export default function TaskDetailsDialog() {
    const {
        selectedTask,
        setSelectedTask,
        reloadThemes
    } = useContext(SideBarContext);

    const handleClose = () => {
        setSelectedTask(null);
    };

    const handleDelete = async () => {
        try {
            await deleteTask(selectedTask.id);
            await reloadThemes();
        } catch (err) {
            console.error("Error al eliminar tarea:", err);
        } finally {
            handleClose();
        }
    };

    if (!selectedTask) return null;

    return (
        <Dialog open={!!selectedTask} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedTask.title}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle2" gutterBottom>Publicado: {selectedTask.date}</Typography>
                <Typography variant="body1" gutterBottom>{selectedTask.instructions || 'Sin instrucciones'}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tipo: {selectedTask.type === 'question' ? 'Pregunta' : 'Tarea'}
                </Typography>

                {selectedTask.type === 'question' && (
                    <List>
                        {selectedTask.options.map((opt, idx) => (
                            <ListItem key={opt.id}>
                                <ListItemText primary={`Opción ${idx + 1}`} secondary={opt.text} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="error">Eliminar</Button>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}
