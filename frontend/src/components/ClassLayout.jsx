import { Outlet, useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { SideBarContext } from "../context/SideBarContext";


export default function ClassLayout() {
    const { classIdParam } = useParams();
    const { open, setClassId } = useContext(SideBarContext);

    useEffect(() => {
        if (classIdParam) {
            setClassId(classIdParam);
        }
    }, [classIdParam]);

    return (
        <Box sx={{ marginLeft: open ? 35 : 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>

            </Typography>
            <Outlet />
        </Box>
    );
}
