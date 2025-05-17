import { Divider } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonList from "../components/PersonList";
import {
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Checkbox,
    Typography,
    Box,
} from "@mui/material";

export default function PeoplePage() {
    //👥 Participantes de la clase
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
            <Box sx={{ width: "50%", margin: "0 auto", color: "#202020" }}>
                <Box sx={{ pl: 2, mt: 5, mb: 2, display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline" }}>

                    <Typography
                        component="h2"
                        sx={{ fontSize: "32px", fontWeight: "400", color: "#202124" }}
                    >
                        Profesores
                    </Typography>
                    <IconButton>
                        <PersonAddAltIcon sx={{ color: "#202020" }} />
                    </IconButton>
                </Box>
                <Divider />

                <Box sx={{ mt: 2 }}>
                    <PersonList data={teachers} type={"teachers"} />
                </Box>

                <Box sx={{ mt: 5, mb: 1, display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Box sx={{ pl: 2, display: "flex", width: "95%", justifyContent: "space-between", alignItems: "baseline" }}>
                        <Typography
                            component="h2"
                            sx={{ fontSize: "32px", fontWeight: "400", color: "#202124" }}
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
                    <IconButton>
                        <PersonAddAltIcon sx={{ color: "#202020" }} />
                    </IconButton>
                </Box>
                <Divider />
                <Box sx={{ mt: 2, p: 1 }}>
                    <PersonList data={students} type={"students"} />
                </Box>
            </Box>
        </Box>
    );
}
