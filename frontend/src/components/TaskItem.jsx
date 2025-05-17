import { ListItem, ListItemIcon, ListItemText, Avatar, IconButton } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function TaskItem({ task, themeTitle }) {
    const { setSelectedTask } = useContext(SideBarContext);

    const handleOpenDetails = () => {
        setSelectedTask({ ...task, theme: themeTitle });
    };

    return (
        <ListItem secondaryAction={
            <IconButton edge="end" onClick={handleOpenDetails}>
                <InfoOutlinedIcon />
            </IconButton>
        }>
            <ListItemIcon>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <AssignmentOutlinedIcon />
                </Avatar>
            </ListItemIcon>
            <ListItemText
                primary={task.title}
                secondary={`Publicado: ${task.date}`}
                onClick={handleOpenDetails}
                sx={{ cursor: 'pointer' }}
            />
        </ListItem>
    );
}
