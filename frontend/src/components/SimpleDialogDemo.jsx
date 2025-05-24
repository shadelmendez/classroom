import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button, DialogTitle, Dialog, Avatar, Checkbox,
    FormGroup, FormControlLabel, Box, Typography, ListItem
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { SideBarContext } from '../context/SideBarContext';

function SimpleDialog({ onClose, open, selectedStudents, setSelectedStudents }) {

    const { students } = useContext(SideBarContext);


    const handleToggle = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id)
                ? prev.filter((sid) => sid !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map((s) => s.id));
        }
    };


    const handleClose = () => {
        onClose();
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
                            checked={selectedStudents.length === students.length}
                            onChange={handleSelectAll}
                        />
                    }
                    label="Todos los estudiantes"
                />

                {students.map((student) => (
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

    const [open, setOpen] = useState(false);
    const { selectedStudents, setSelectedStudents } = useContext(SideBarContext);

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