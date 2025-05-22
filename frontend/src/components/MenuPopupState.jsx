import {
    Button, Menu, MenuItem, Dialog, DialogTitle,
    DialogActions, DialogContent, TextField, Divider
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {
    Add as AddIcon, ArticleOutlined, HelpCenterOutlined, ViewListOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SideBarContext } from '../context/SideBarContext'
import { getSubjects, createTheme } from '../api/api';

export default function MenuPopupState() {
    const {
        setIsQuestion,
        setThemeTitle,
        themeTitle,
        classId,
        reloadThemes
    } = useContext(SideBarContext);

    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState("");

    const handleNavigation = (type) => {
        setIsQuestion(type === 'question');
        navigate(`/class/${classId}/createhomework`);
    };

    const handleAddTheme = async () => {
        if (!themeTitle.trim()) {
            setError("El título no puede estar vacío.");
            return;
        }

        try {
            const allSubjects = await getSubjects();
            const target = allSubjects.data.find(s => s.name === classId);
            if (!target) {
                setError("No hay clases registradas o la clase actual no existe.");
                return;
            }

            await createTheme({
                title: themeTitle,
                subject_id: target.id,
            });

            await reloadThemes();

            // Reset
            setThemeTitle('');
            setOpenDialog(false);
            setError('');
        } catch (err) {
            console.error("Error al crear tema:", err);
            setError("No se pudo crear el tema. Verifica el nombre de la clase.");
        }
    };

    return (
        <>
            <PopupState variant="popover" popupId="menu-popup">
                {(popupState) => (
                    <>
                        <Button variant="contained" {...bindTrigger(popupState)} sx={{ borderRadius: 15, px: 3, py: 1.5 }}>
                            <AddIcon /> Crear
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={() => handleNavigation('task')}>
                                <ArticleOutlined sx={{ mr: 1 }} /> Tarea
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('question')}>
                                <HelpCenterOutlined sx={{ mr: 1 }} /> Pregunta
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => setOpenDialog(true)}>
                                <ViewListOutlined sx={{ mr: 1 }} /> Tema
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </PopupState>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Agregar tema</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Título del tema"
                        value={themeTitle}
                        onChange={(e) => setThemeTitle(e.target.value)}
                        fullWidth
                        error={!!error}
                        helperText={error}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAddTheme} variant="contained">Agregar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
