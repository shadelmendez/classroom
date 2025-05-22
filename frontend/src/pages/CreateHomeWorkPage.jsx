import {
    Box,
    TextField,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    useTheme,
    Select,
    MenuItem
} from '@mui/material';

import { useState, useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';
import SideBarClassWork from '../components/SideBarClassWork';
import { createTask } from '../api/api';

export default function CreateHomeWorkPage() {
    const {
        title, setTitle,
        instructions, setInstructions,
        selectedTheme, setSelectedTheme,
        isQuestion,
        themesData, points, dueDate,
        setThemeId, reloadThemes
    } = useContext(SideBarContext);

    const theme = useTheme();

    const [options, setOptions] = useState([
        { text: '', id: 'a' },
        { text: '', id: 'b' },
        { text: '', id: 'c' },
    ]);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleOptionTextChange = (index, newText) => {
        const updated = [...options];
        updated[index].text = newText;
        setOptions(updated);
    };

    const getThemeIdByTitle = (title) => {
        const theme = themesData.find(t => t.title === title);
        console.log("theme ", theme, "title", title, "themesData", themesData)
        const themeId = theme?.id;
        console.log("themeId ", themeId)
        setThemeId(themeId)
        return themeId
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const taskPayload = {
                title,
                instructions,
                type: isQuestion ? 'question' : 'task',
                date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }),
                points: points,
                due_date: dueDate?.format("YYYY-MM-DD") || null,
                theme_id: getThemeIdByTitle(selectedTheme),
                options: isQuestion
                    ? options.map(opt => ({
                        text: opt.text,
                        identifier: opt.id,
                        is_correct: opt.id === selectedOption
                    }))
                    : []
            };
            console.log("taskPayload ", taskPayload)

            await createTask(taskPayload);

            // Recarga los temas actualizados
            await reloadThemes();

            // Reset form
            setTitle('');
            setInstructions('');
            setOptions([
                { text: '', id: 'a' },
                { text: '', id: 'b' },
                { text: '', id: 'c' },
            ]);
            setSelectedOption('');
            setSelectedTheme('');
        } catch (err) {
            console.error("Error al guardar tarea:", err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                justifyContent: "space-between",
                gap: 5,
                width: "100%",
                backgroundColor: "rgb(248, 249, 250)"
            }}
        >
            <Box
                sx={{
                    width: "60%",
                    borderRadius: 3,
                    border: 1,
                    borderColor: "#dadce0",
                    padding: 4,
                    backgroundColor: theme.palette.background.default
                }}
            >
                <TextField
                    label={isQuestion ? "Pregunta" : "Tarea"}
                    variant="filled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Instrucciones (opcional)"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <Select
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Selecciona un tema</em>
                        </MenuItem>
                        {themesData.map((t, idx) => (
                            <MenuItem key={idx} value={t.title}>
                                {t.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {isQuestion && (
                    <FormControl sx={{ mt: 2, width: "100%" }}>
                        {options.map((option, index) => (
                            <RadioGroup
                                key={option.id}
                                value={selectedOption}
                                onChange={handleOptionChange}
                                name="question-options"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <FormControlLabel
                                    value={option.id}
                                    control={<Radio />}
                                    label=""
                                />
                                <TextField
                                    label={`Respuesta ${index + 1}`}
                                    variant="filled"
                                    value={option.text}
                                    onChange={(e) => handleOptionTextChange(index, e.target.value)}
                                    sx={{ width: "90%" }}
                                />
                            </RadioGroup>
                        ))}
                    </FormControl>
                )}
            </Box>

            <SideBarClassWork />
        </Box>
    );
}
