import { Box } from '@mui/material';
import MenuPopupState from '../components/MenuPopupState';
import ThemeList from '../components/ThemeList';
import TaskDetailsDialog from '../components/TaskDetailsDialog';


export default function ClassWorkPage() {
    return (
        <Box sx={{ p: 2 }}>
            <MenuPopupState />
            <ThemeList />
            <TaskDetailsDialog />
        </Box>
    );
}
