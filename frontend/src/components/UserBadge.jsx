import {
    Box,
    Checkbox,
    Avatar,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import React, { useState } from "react"

export default function UserBadge({ members, showTopBorder }) {

    //const TeacherOptions = ["Enviar correo", "Quitar", "Hacer propietario de la clase"];
    const studentOptions = ["Enviar correo a alumno", "Quitar", "Silenciar"];


    const [selectedMembers, setSelectedMembers] = useState([]);

    const allSelected = selectedMembers.length === members.length;
    const someSelected = selectedMembers.length > 0 && !allSelected;

    const handleSelectAll = (event) => {
        setSelectedMembers(event.target.checked ? [...members] : []);
    };

    const handleSelectOne = (name) => (event) => {
        setSelectedMembers((prev) =>
            event.target.checked
                ? [...prev, name]
                : prev.filter((n) => n !== name)
        );
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const showCheckboxes = type === "students";
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                p: 2,
                borderTop: showTopBorder ? "1px solid #e0e0e0" : "none"
            }}
        >
            {/* Left side: Checkbox + Avatar + Name */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {showControls && (
                    <Checkbox checked={isSelected} onChange={onToggle} />
                )}
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1">{name}</Typography>
            </Box>

            {/* Right side: Menu icon (only for students) */}
            {showControls && (
                <>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {studentOptions.map((option) => (
                            <MenuItem key={option} onClick={handleMenuClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}

        </Box>
    );

}
