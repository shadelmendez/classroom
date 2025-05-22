import { createContext, useState, useEffect } from 'react';
import { getSubjectByName, getSubjects } from '../api/api';

export const SideBarContext = createContext();

function SideBarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [classId, setClassId] = useState("default-id");

    const [themesData, setThemesData] = useState([]);
    const [themeTitle, setThemeTitle] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isQuestion, setIsQuestion] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [points, setPoints] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [themeId, setThemeId] = useState(null);

    //Función reutilizable para cargar temas
    const reloadThemes = async (forceClassId) => {
        const idToUse = forceClassId || classId;
        if (!idToUse || idToUse === "default-id") return;

        try {
            const subjects = await getSubjects();
            const exists = subjects.data.some(s => s.name === idToUse);
            if (!exists) {
                setThemesData([]);
                return;
            }

            const res = await getSubjectByName(idToUse);
            setThemesData(res.data.themes || []);
        } catch (err) {
            console.error("Error al recargar temas:", err);
            setThemesData([]);
        }
    };

    // Ejecutar al cambiar de clase
    useEffect(() => {
        reloadThemes();
    }, [classId]);

    return (
        <SideBarContext.Provider value={{
            open, setOpen,
            classId, setClassId,
            themesData, setThemesData,
            themeTitle, setThemeTitle,
            selectedTheme, setSelectedTheme,
            title, setTitle,
            instructions, setInstructions,
            isQuestion, setIsQuestion,
            selectedTask, setSelectedTask,
            points, setPoints,
            dueDate, setDueDate,
            themeId, setThemeId,
            reloadThemes,
        }}>
            {children}
        </SideBarContext.Provider>
    );
}

export default SideBarProvider;
