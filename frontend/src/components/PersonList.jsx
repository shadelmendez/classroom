import React, { useState } from "react";
import NotStudentsFound from '../assets/NotStudentsFound.svg';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import PersonBadge from "./PersonBadge";

export default function PersonList({ data = [], type }) {
    const [selected, setSelected] = useState([]);
    const isStudent = type === "students";
    const allSelected = data.length > 0 && selected.length === data.length;
    const someSelected = selected.length > 0 && selected.length < data.length;
    const studentOptions = ["Enviar correo a alumno", "Quitar", "Silenciar"];
    const teacherOptions = ["Enviar correo", "Quitar", "Hacer propietario de la clase"];

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allIds = data.map((person) => person.id);
            setSelected(allIds);
        } else {
            setSelected([]);
        }
    };
    const handleSelectOne = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };


    const handleBulkAction = (event) => {
        const action = event.target.value;
        console.log(`Apply "${action}" to:`, selected);
        if (action === "Enviar correo a alumno") {
            const recipients = data
                .filter((person) => selected.includes(person.id))
                .map((person) => person.email);

            if (recipients.length > 0) {
                const mailto = `https://mail.google.com/mail/?view=cm&to=${recipients.join(",")}`;
                window.open(mailto, "_blank");
            }
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            {isStudent ? (
                (data.length > 0) ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={allSelected}
                                        indeterminate={someSelected}
                                        onChange={handleSelectAll}
                                    />
                                }
                            />
                            <Select
                                size="small"
                                displayEmpty
                                value=""
                                onChange={handleBulkAction}
                                renderValue={() => "Acciones"}
                                disabled={selected.length === 0}
                                sx={{ color: "#1976d2", fontWeight: "400" }}
                            >
                                {studentOptions.map((opt) => (
                                    <MenuItem sx={{ color: "#000" }} key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </>
                ) :
                    <>
                        <Box sx={{ width: "100%", textAlign: "center", margin: "0 auto", mt: 10 }}>
                            <img src={NotStudentsFound} alt="No hay estudiantes en la clase" />
                            <Typography sx={{ fontSize: "20px" }}>No tienes alumnos en esta clase</Typography>
                        </Box>
                    </>
            ) : ""}

            {data.map((person, index) => (
                <PersonBadge
                    key={person.id}
                    person={person}
                    selected={selected.includes(person.id)}
                    onSelect={() => handleSelectOne(person.id)}
                    type={type}
                    options={type === "students" ? studentOptions : teacherOptions}
                    showTopBorder={index > 0}
                />
            ))}
        </Box>
    );
}

