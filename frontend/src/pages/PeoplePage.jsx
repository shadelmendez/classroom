import { Divider, Tooltip } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloseIcon from "@mui/icons-material/Close"
import PersonList from "../components/PersonList";
import {
    IconButton,
    Typography,
    Box,
    Dialog,
    styled,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function PeoplePage() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const teachers = [
        { id: 1, name: "Carlos Caraballo", email: "carlosC@example.com" },
    ];
    const students = [
        { id: 1, name: "Willy Quezada", email: "willy@example.com" },
        { id: 2, name: "Shadel Mendez", email: "Shadel@example.com" },
        { id: 3, name: "Janeiro Placido", email: "Janeiro@example.com" },
    ];


    return (
        <Box>
            <Box sx={{ width: "45%", margin: "0 auto", color: "#202020", mb: 20 }}>
                <Box sx={{ pl: 2, mt: 5, mb: 2, display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Typography
                        component="h2"
                        sx={{ fontSize: "35px", fontWeight: "400", color: "#202124" }}
                    >
                        Profesor
                    </Typography>
                </Box>
                <Divider />

                <Box sx={{ mt: 2 }}>
                    <PersonList data={teachers} type={"teachers"} />
                </Box>

                <Box sx={{ mt: 5, mb: 1, display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline", gap: 2 }}>
                    <Box sx={{ pl: 2, display: "flex", width: "95%", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography
                            component="h2"
                            sx={{ fontSize: "35px", fontWeight: "400", color: "#202124" }}
                        >
                            Alumnos
                        </Typography>
                        {students.length > 0 && (
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "1rem", fontWeight: "400", color: "#202124" }}
                            >{students.length} alumnos</Typography>
                        )}
                    </Box>
                    <Tooltip title={<h1 style={{ fontWeight: 400, fontSize: "13px" }}>Agregar estudiantes</h1>}>
                        <IconButton onClick={handleClickOpen}>
                            <PersonAddAltIcon fontSize="normal" sx={{ color: "#202020" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider />
                <Box sx={{ mt: 2, p: 1 }}>
                    <PersonList data={students} type={"students"} />
                </Box>
            </Box>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{width:"500px", margin: "0 auto"}}
            >
                <DialogTitle sx={{ m: 0, p: 2,color:"#202124"}} id="customized-dialog-title">
                    Agregar estudiantes
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography sx={{pb:3}} gutterBottom>
                        Inscribe estudiantes a tu clase seleccionando del listado de usuarios que utilizan nuestra plataforma :)
                    </Typography>

                    <Autocomplete
                        freeSolo
                        id="selectStudent"
                        disableClearable
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un usuario"
                                slotProps={{
                                    input: {
                                        ...params.InputProps,
                                        type: 'search',
                                    },
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} sx={{fontWeight:"600"}}>
                        Agregar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    );
}
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    }]