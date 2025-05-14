import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DraftsIcon from '@mui/icons-material/Drafts';
import { styled, useTheme } from "@mui/material/styles";

import { Box, Link, Avatar } from '@mui/material'

export default function Theme() {
    const theme = useTheme();
    return (
        <Box sx={{ marginY: 4, width: "100%" }}>

            <Link href="#" variant='h4' color='#000' underline="hover" >Titulo del tema</Link>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List sx={{ width: "80%" }}>
                    <Divider />
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                                    <AssignmentOutlinedIcon />
                                </Avatar>
                            </ListItemIcon>
                            <Box sx={{ justifyContent: "space-between", gap: 65, alignItems: "center", flex: 1, display: "flex" }}>
                                <ListItemText primary="Tarea 1" />
                                <ListItemText secondary="Publicado: 9 mayo" />
                            </Box>
                        </ListItemButton>
                    </ListItem>

                    <Divider />
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                                    <AssignmentOutlinedIcon />
                                </Avatar>
                            </ListItemIcon>
                            <Box sx={{ justifyContent: "space-between", gap: 65, alignItems: "center", flex: 1, display: "flex" }}>
                                <ListItemText primary="Tarea 1" />
                                <ListItemText secondary="Publicado: 9 mayo" />
                            </Box>
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>


        </Box>
    )
}
