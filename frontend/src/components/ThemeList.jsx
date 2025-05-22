import { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { SideBarContext } from '../context/SideBarContext';
import ThemeItem from './ThemeItem';

export default function ThemeList() {
    const { themesData } = useContext(SideBarContext);
    console.log("themesData.length ", themesData.length, "themesData ", themesData)
    if (!Array.isArray(themesData) || themesData.length === 0) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Todavía no se han creado temas para esta clase.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Usa el botón <strong>“Crear”</strong> para agregar un nuevo tema.
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
