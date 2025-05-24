// IntegranteItem.jsx
import React, { useState } from "react";
import {
    Box,
    Checkbox,
    Avatar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PersonBadge({ person, selected, onSelect, type, options, showTopBorder }) {
    const isStudent = type === "students";
    const isTeacher = type === "teachers";

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleAction = (option) => {
        if (option === "Enviar correo a alumno") {
            console.log("Enviando email a: ", person.name)
            const mailto = `https://mail.google.com/mail/?view=cm&to=${person.email}`;
            window.open(mailto, "_blank");
        }
        if (option === "Quitar") {
            console.log("Eliminando a: ", person.name)
        }
        handleMenuClose();
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderTop: showTopBorder ? "1px solid #e0e0e0" : "none"
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap:2 }}>
                {isStudent && (
                    <Checkbox checked={selected} onChange={onSelect} />
                )}
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {person.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1">{person.name}</Typography>
            </Box>

            {isStudent && (
                <>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon sx={{ color: "#000" }} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {options.map((option) => (
                            <MenuItem key={option} sx={{ color: "#000" }} onClick={() => handleAction(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Box>
    );
}