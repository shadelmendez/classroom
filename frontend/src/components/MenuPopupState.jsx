import { Button, Menu, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Divider } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Add as AddIcon, ArticleOutlined, HelpCenterOutlined, ViewListOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SideBarContext } from '../context/SideBarContext';

export default function MenuPopupState() {
    const { setIsQuestion, setThemeTitle, themeTitle, setThemesData, classId } = useContext(SideBarContext);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleNavigation = (type) => {
        if (type === 'question') {
            setIsQuestion(true);
        } else {
            setIsQuestion(false);
        }
        navigate(`/class/${classId}/createhomework`);
    };

    const handleAddTheme = () => {
        if (themeTitle.trim()) {
            setThemesData(prev => [...prev, { title: themeTitle, tasks: [] }]);
            setThemeTitle('');
            setOpenDialog(false);
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddTheme}>Agregar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
