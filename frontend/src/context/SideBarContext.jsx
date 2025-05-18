import { createContext, useState } from 'react';

export const SideBarContext = createContext();

function SideBarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [classId, setClassId] = useState("default-id");
    const [points, setPoints] = useState(0);
    const [dueDate, setDueDate] = useState(null);


    const [themesData, setThemesData] = useState([]);
    const [themeTitle, setThemeTitle] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isQuestion, setIsQuestion] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);


    return (
        <SideBarContext.Provider value={{
            open, setOpen, classId, setClassId, points, setPoints, dueDate, setDueDate,
            themesData, setThemesData,
            themeTitle, setThemeTitle,
            selectedTheme, setSelectedTheme,
            title, setTitle,
            instructions, setInstructions,
            isQuestion, setIsQuestion,
            selectedTask, setSelectedTask
        }}>
            {children}
        </SideBarContext.Provider>
    );
}

export default SideBarProvider;
