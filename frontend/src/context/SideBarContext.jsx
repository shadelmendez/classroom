import { createContext, useState, useEffect } from 'react';
import { getSubjectByName, getSubjects, getUngradedTasksForStudent } from '../api/api';

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

    const [isScored, setIsScored] = useState(false)

    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'Janeiro Placido',
            avatar: 'J',
            assignedTasks: [1, 2]
        },
        {
            id: 2,
            name: 'Willy Q.V',
            avatar: 'W',
            assignedTasks: [2]
        }
    ]); //esto deberia ser de la ruta de people

    const fetchUnscoredTasks = async (studentId) => {
        const res = await getUngradedTasksForStudent(studentId);
        const taskIds = res.data.map(task => task.id);

        setStudents(prev => prev.map(st => ({
            ...st,
            assignedTasks: taskIds
        })));
    };


    const [selectedStudents, setSelectedStudents] = useState([]);

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

    useEffect(() => {
        reloadThemes();

        // aqui deberia ir los ids de los estudiantes creados en la db
        const loadUngraded = async () => {
            await fetchUnscoredTasks(1); // Janeiro Placido
            await fetchUnscoredTasks(2); // Willy Q.V
        };

        loadUngraded();
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
            students, setStudents,
            selectedStudents, setSelectedStudents,
            fetchUnscoredTasks,
            isScored, setIsScored
        }}>
            {children}
        </SideBarContext.Provider>
    );
}

export default SideBarProvider;
