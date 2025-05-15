import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Button, DialogTitle, Dialog, Avatar, Checkbox,
    FormGroup, FormControlLabel, Box, Typography, ListItem
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

// Lista de estudiantes ficticios (puedes venir de props o API)
const studentsList = [
    { id: 1, name: 'Janeiro Placido' },
    { id: 2, name: 'Willy Q.V' },
    { id: 3, name: 'Estudiante 3' },
];

function SimpleDialog({ onClose, open, selectedStudents, setSelectedStudents }) {

    const handleToggle = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id)
                ? prev.filter((sid) => sid !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedStudents.length === studentsList.length) {
            setSelectedStudents([]); // deselecciona todos
        } else {
            setSelectedStudents(studentsList.map((s) => s.id)); // selecciona todos
        }
    };

    const handleClose = () => {
        onClose(); // cerrar el diálogo
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            PaperProps={{
                sx: { width: '400px', p: 2, borderRadius: 2 }
            }}
        >
            <DialogTitle>Asignar a</DialogTitle>

            <FormGroup sx={{ px: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedStudents.length === studentsList.length}
                            onChange={handleSelectAll}
                        />
                    }
                    label="Todos los estudiantes"
                />

                {studentsList.map((student) => (
                    <FormControlLabel
                        key={student.id}
                        control={
                            <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onChange={() => handleToggle(student.id)}
                            />
                        }
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24 }}>
                                    {student.name[0]}
                                </Avatar>
                                <Typography>{student.name}</Typography>
                            </Box>
                        }
                    />
                ))}

                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button variant="contained" onClick={handleClose}>
                        Listo
                    </Button>
                </Box>
            </FormGroup>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedStudents: PropTypes.array.isRequired,
    setSelectedStudents: PropTypes.func.isRequired,
};


export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedStudents, setSelectedStudents] = React.useState([]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<PersonAddAlt1Icon />}
            >
                {selectedStudents.length === 0
                    ? 'Todos los estudiantes'
                    : `${selectedStudents.length} seleccionado(s)`}
            </Button>

            <SimpleDialog
                open={open}
                onClose={handleClose}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
            />
        </>
    );
}
