import { Outlet, useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { useContext } from "react";
import { SideBarContext } from "../context/SideBarContext";

export default function ClassLayout() {
    const { classId } = useParams();
    const { open } = useContext(SideBarContext)

    return (
        <Box sx={{ marginLeft: open ? 35 : 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Clase: {classId}
            </Typography>
            <Outlet />
        </Box>
    );
}
